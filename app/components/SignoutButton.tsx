'use client';

// import { LogOut } from 'lucide-react';
import { signout } from '../auth/actions';
import { useUser } from '@/hooks/useUser';
import Button from './Button';
import { useState } from 'react';
import { Loader, LogOut } from 'lucide-react';

interface SignoutButtonProps {
  className?: string;
}

const SignoutButton: React.FC<SignoutButtonProps> = ({ className }) => {
  const user = useUser();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignout = async () => {
    setSigningOut(true);
    await signout();
    setSigningOut(false);
  };

  return (
    <Button
      label={signingOut ? 'signing out...' : 'sign out'}
      icon={
        signingOut ? (
          <Loader size={16} className="animate-spin" />
        ) : (
          <LogOut size={16} />
        )
      }
      onClick={handleSignout}
      className={`${className} ${!user ? 'hidden' : 'flex items-center gap-2 capitalize'}`}
      disabled={signingOut}
      secondary
    />
  );
};

export default SignoutButton;
