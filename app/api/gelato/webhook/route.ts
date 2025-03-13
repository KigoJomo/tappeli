// app/api/gelato/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { TemplateWebhookEvent } from '@/utils/gelato/types';
import { createServiceClient } from '@/utils/supabase/service-client';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const supabase = createServiceClient();
  
  try {
    const payload: TemplateWebhookEvent = await request.json();
    const signature = request.headers.get('X-Gelato-Signature');
    const secret = process.env.GELATO_WEBHOOK_SECRET!;

    // Validate signature
    if (!signature || signature !== secret) {
      return NextResponse.json(
        { error: 'Invalid or missing signature' },
        { status: 401 }
      );
    }

    // Handle different event types
    switch (payload.event) {
      case 'store_product_template_created':
        await handleTemplateCreated(supabase, payload);
        break;

      case 'store_product_template_updated':
        await handleTemplateUpdated(supabase, payload);
        break;

      case 'store_product_template_deleted':
        await handleTemplateDeleted(supabase, payload);
        break;

      default:
        console.warn('Unhandled event type:', payload.event);
        return NextResponse.json(
          { error: 'Unhandled event type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Template creation handler
async function handleTemplateCreated(
  supabase: ReturnType<typeof createServiceClient>,
  payload: TemplateWebhookEvent
) {
  // Upsert template
  const { error: templateError } = await supabase
    .from('gelato_templates')
    .upsert({
      id: payload.storeProductTemplateId,
      title: payload.title,
      description: payload.description,
      preview_url: payload.previewUrl,
      created_at: new Date(payload.createdAt).toISOString(),
      updated_at: new Date(payload.updatedAt).toISOString()
    });

  if (templateError) throw templateError;

  // Process variants
  await syncVariants(supabase, payload);
}

// Template update handler
async function handleTemplateUpdated(
  supabase: ReturnType<typeof createServiceClient>,
  payload: TemplateWebhookEvent
) {
  // Update template
  const { error: templateError } = await supabase
    .from('gelato_templates')
    .update({
      title: payload.title,
      description: payload.description,
      preview_url: payload.previewUrl,
      updated_at: new Date(payload.updatedAt).toISOString()
    })
    .eq('id', payload.storeProductTemplateId);

  if (templateError) throw templateError;

  // Sync variants (delete removed ones)
  const currentVariantIds = payload.variants.map(v => v.id);
  
  // Delete variants not present in the update
  const { error: deleteError } = await supabase
    .from('gelato_variants')
    .delete()
    .eq('template_id', payload.storeProductTemplateId)
    .not('id', 'in', `(${currentVariantIds.join(',')})`);

  if (deleteError) throw deleteError;

  // Update remaining variants
  await syncVariants(supabase, payload);
}

// Template deletion handler
async function handleTemplateDeleted(
  supabase: ReturnType<typeof createServiceClient>,
  payload: TemplateWebhookEvent
) {
  const { error } = await supabase
    .from('gelato_templates')
    .delete()
    .eq('id', payload.storeProductTemplateId);

  if (error) throw error;
}

// Shared variant sync logic
async function syncVariants(
  supabase: ReturnType<typeof createServiceClient>,
  payload: TemplateWebhookEvent
) {
  const variants = payload.variants.map(v => ({
    id: v.id,
    template_id: payload.storeProductTemplateId,
    product_uid: v.productUid,
    title: v.title,
    variant_options: v.variantOptions,
    created_at: new Date(payload.createdAt).toISOString(),
    updated_at: new Date(payload.updatedAt).toISOString()
  }));

  // Batch upsert in chunks of 500 (Supabase limit)
  const chunkSize = 500;
  for (let i = 0; i < variants.length; i += chunkSize) {
    const chunk = variants.slice(i, i + chunkSize);
    
    const { error } = await supabase
      .from('gelato_variants')
      .upsert(chunk, { onConflict: 'product_uid' });

    if (error) throw error;
  }
}