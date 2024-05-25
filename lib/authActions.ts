'use server';

import { supabase } from '@/utils/supabase/client';

import { redirect } from 'next/navigation';

export async function signOut() {
  await supabase.auth.signOut();
  return redirect('/login');
}
