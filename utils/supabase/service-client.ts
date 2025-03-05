// utils/supabase/service-client.ts

import { createClient } from "@supabase/supabase-js";

export const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  const serviceClient = createClient(supabaseUrl, serviceRoleKey);
  
  return serviceClient;
};