import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Nunito_Sans } from 'next/font/google'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};
const arimo = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={arimo.className}>
      <body className="bg-secondary-foreground text-foreground  w-full">
          {children}
        
      </body>
    </html>
  );
}
