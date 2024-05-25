
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './lib/getUser';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  await updateSession(request)
  const currentUser = request.cookies.get('currentUser')?.value
  const user = await getUser()
  console.log('currentUser', currentUser)
  const url = request.nextUrl.clone();
  // if (url.pathname !== '/login' && !currentUser) {
  //     url.pathname = '/login';
  //     return NextResponse.redirect(url);
  //     }
  if (url.pathname === '/') {
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}


export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
