import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/lib/authActions';

const AuthButton = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut} method="POST">
      <button className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border text-white">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link href="/login" className='py-2 px-4 rounded-md bg-black text-white'>
        Login
    </Link>
  );
};

export default AuthButton;
