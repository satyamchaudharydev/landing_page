import { supabase } from '@/utils/supabase/client';
import { getUser } from './getUser';


export const handleDelete = async (id: string) => {
    const user = await getUser()
    const { data,error } = await supabase
      .from('landing_pages')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);
      ;
      console.log(data);
      console.log(error); 

    if (error) {
      console.error('Error deleting landing page:', error.message);
    } else {
      // Ideally, you should refetch the data or use a state management solution to update the UI
    //   location.reload(); // Reload the page to see the changes
    }
  };
