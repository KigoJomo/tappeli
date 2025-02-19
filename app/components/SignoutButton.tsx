'use client';

// import { LogOut } from 'lucide-react';
import { signout } from '../auth/actions';
import { useUser } from '@/hooks/useUser';
import Button from './Button';

const SignoutButton = () => {
  const user = useUser();

  return (
    <Button
      label="sign out"
      onClick={signout}
      className={`${!user ? 'hidden' : 'flex items-center gap-2 capitalize'}`}
    />
  );
};

export default SignoutButton;
