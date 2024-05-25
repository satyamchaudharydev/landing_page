import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className="grid flex-col w-full px-8  min-h-screen items-center justify-center gap-2" style={{
      background: "linear-gradient(to right, #283048, #859398);"
    }}>

      <form className="min-w-[448px] animate-in flex-1 flex flex-col h-fit  justify-center gap-2 text-foreground rounded-[20px] p-10" style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(20px)",
      }}>
       <h3 className="text-2xl text-center mb-2">Welcome to Fibr</h3>
        <input
          className="px-6 py-4 bg-inherit mb-6 rounded-[10px]"
          name="email"
          placeholder="Email"
          required
        />
       
        <input
          className="px-6 py-4 bg-inherit mb-6 rounded-[10px]"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-[#5475ff] rounded-[10px] px-6 py-3 text-foreground mb-2 text-[1.1rem]"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <SubmitButton
          formAction={signUp}
          className="rounded-md px-6 py-3 mb-2 bg-white text-black text-[1.1rem]"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
