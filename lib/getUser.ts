'use server';

import { createClient } from '@/utils/supabase/server';

export async function getUser() {
    const serverSupabase = createClient();
    const { data: { user } } = await serverSupabase.auth.getUser();
    return user;
}
