'use client';

import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { members } from '@wix/members';
import Cookies from 'js-cookie';

const refreshToken = JSON.parse(Cookies.get('refreshToken')!);
const accessToken = JSON.parse(Cookies.get('accessToken')!);

export const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    members,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      accessToken,
      refreshToken
    }
  }),
});
