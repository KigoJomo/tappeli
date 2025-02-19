// hooks/useUser.ts
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function useUser(): SupabaseUser | null {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Get the current session on mount.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes to the authentication state.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cleanup the listener on unmount.
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
}