import React from 'react'
import AuthButton from './AuthButton'
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = async () => {
  return (
    <nav className=" w-full flex justify-center border-b border-b-[#252525] h-15 bg-background">
    <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
      <Link href={"/home"}>
        <Image src="https://app.getfibr.co/_next/static/media/fibr_logo_new.8ffbd499.svg" width={100} height={100} alt="logo" />
      </Link>
        <AuthButton />
    </div>
  </nav>
  )
}
