// app/components/LoginBtn.tsx

'use client';

import { FC, useState } from 'react';
import Button from './Button';
import { wixClient } from '@/utils/wix/client';
import Link from 'next/link';
import { Loader } from 'lucide-react';

const LoginBtn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    const loginRequest = wixClient.auth.generateOAuthData(
      'http://localhost:3000',
    );
  
    localStorage.setItem('oAuthRedirectData', JSON.stringify(loginRequest));
    const { authUrl } = await wixClient.auth.getAuthUrl(loginRequest);
  
    window.location.href = authUrl;
    setLoading(false);
  };

  return (
    <>
      {wixClient.auth.loggedIn() ? (
        <Link href={'/account'}></Link>
      ) : (
        <Button
          label="log in"
          onClick={login}
          disabled={loading}
          icon={
            loading ? <Loader className="animate-spin" size={16} /> : undefined
          }
        />
      )}
    </>
  );
};

export default LoginBtn;
