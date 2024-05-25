import React from 'react'
import { supabase } from '@/utils/supabase/client';
import { createClient } from '@/utils/supabase/server';
import { Home } from './Home';
import { Navbar } from '@/components/Navbar';

export default async function Page (){
    const serverSupabase = createClient();

    const { data: { user } } = await serverSupabase.auth.getUser();
    const { data, error } = await supabase
        .from('landing_pages')
        .select('id, title, description, status')
        .eq('user_id', user?.id)
        ;

  if (error) {
    console.error('Error fetching landing pages:', error.message);
    return <div>Error fetching landing pages</div>;
  }

  return (
    <div>
      <Navbar />
      <Home data={data} />
    </div>
  )
}

