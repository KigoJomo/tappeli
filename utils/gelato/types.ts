// utils/gelato/types.ts
export interface TemplateWebhookEvent {
  id: string;
  event: 'store_product_template_created' | 
         'store_product_template_updated' |
         'store_product_template_deleted';
  storeProductTemplateId: string;
  title: string;
  description: string;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
  variants: GelatoVariant[];
}

export interface GelatoVariant {
  id: string;
  title: string;
  productUid: string;
  variantOptions: {
    name: string;
    value: string;
  }[];
  imagePlaceholders: Array<{
    name: string;
    printArea: string;
    height: number;
    width: number;
  }>;
  textPlaceholders: Array<{
    name: string;
    text: string;
  }>;
}