import { createClient, OAuthStrategy } from '@wix/sdk';
import { collections, products } from '@wix/stores';

export const wixClient = createClient({
  modules: { collections, products },
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
});
