// app/api/gelato/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { TemplateWebhookEvent } from '@/utils/gelato/types';
import { createServiceClient } from '@/utils/supabase/service-client';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
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
        await handleTemplateCreated(payload);
        break;

      case 'store_product_template_updated':
        await handleTemplateUpdated(payload);
        break;

      case 'store_product_template_deleted':
        await handleTemplateDeleted(payload);
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

// Handle template creation
async function handleTemplateCreated(payload: Partial<TemplateWebhookEvent>) {
  const supabase = createServiceClient();
  const templateData = {
    template_uid: payload.storeProductTemplateId,
    name: payload.title,
    description: payload.description,
    preview_url: payload.previewUrl,
    variants: payload.variants,
    created_at: payload.createdAt
      ? new Date(payload.createdAt).toISOString()
      : new Date().toISOString(),
    updated_at: payload.updatedAt
      ? new Date(payload.updatedAt).toISOString()
      : new Date().toISOString(),
  };

  const { error } = await supabase
    .from('gelato_templates')
    .upsert(templateData, {
      onConflict: 'template_uid',
    });

  if (error) throw error;
}

// Handle template updates
async function handleTemplateUpdated(payload: Partial<TemplateWebhookEvent>) {
  const supabase = createServiceClient();
  const updateData = {
    name: payload.title,
    description: payload.description,
    preview_url: payload.previewUrl,
    variants: payload.variants,
    updated_at: payload.updatedAt
      ? new Date(payload.updatedAt).toISOString()
      : new Date().toISOString(),
  };

  const { error } = await supabase
    .from('gelato_templates')
    .update(updateData)
    .eq('template_uid', payload.storeProductTemplateId);

  if (error) throw error;
}

// Handle template deletion
async function handleTemplateDeleted(payload: Partial<TemplateWebhookEvent>) {
  const supabase = createServiceClient();
  const { error } = await supabase
    .from('gelato_templates')
    .delete()
    .eq('template_uid', payload.storeProductTemplateId);

  if (error) throw error;
}
