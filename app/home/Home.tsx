"use client"
import { Navbar } from '@/components/Navbar';
import { PortfolioCardMenu } from '@/components/PortfolioCardMenu';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect } from 'react'

interface LandingPage {
    id: string;
    title: string;
    description: string;
    status: string;
  } 
export const Home = ({data}: {data: LandingPage[]}) => {
  const [pages,setPages] = React.useState<LandingPage[]>(data)

  const onDeletePage = (id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id))
  }

  return (
    <div className="w-full">
    <main className='w-full flex justify-center items-center mt-[20px] flex-col'>
     <div className='w-[80%] flex flex-col gap-3'>
      <Button asChild className='ml-auto'>
              <Link href="/create" className='bg-primary'>
                  Create New 
              </Link>
          </Button>
          <ul className='flex justify-center items-center' style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, 300px)"
                }}>
          {pages.map((page: LandingPage) => (
              <li key={page.id} className='w-full py-2 px-3 rounded-md hover:bg-btn-background-hover flex flex-col gap-2'>
                <Link href={`/view/${page.id}`} className='flex justify-between'>
                  <div className='bg-[#333333] w-full h-[370px] flex justify-center items-center' style={{
                    "boxShadow": '#0000 0 0 2px 1px, #00000006 0 .6021px 2.0474px, #00000017 0 2.2885px 7.781px, #0006 0 10px 34px'
                  }} >

                    <Image style={{
                      filter: 'brightness(0.3)'
                    }} width={60} height={60} src="/logo.png" alt="logo"  objectFit="contain" />
                  </div>
                </Link>
                <div>
                  <div className='flex justify-between relative'>
                    <h2 className='text-base font-[600]'>{page.title}</h2>
                    <div className='absolute right-0'>
                      <PortfolioCardMenu id={page.id} onDeletePage={onDeletePage} />
                    </div>
                  </div>
                  <p className='mt-1 opacity-[60%]'>{page.description}</p>
                </div>
                
              </li>
          ))}
          </ul>
     </div>
    </main>
 
  </div>
  )
}
