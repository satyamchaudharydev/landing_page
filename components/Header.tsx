
import NextLogo from "./NextLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="w-full">
    <div className="py-6 font-bold bg-purple-950 text-center">
      This is a protected page that you can only see as an authenticated
      user
    </div>
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
      </div>
    </nav>
  </div>
  );
}
