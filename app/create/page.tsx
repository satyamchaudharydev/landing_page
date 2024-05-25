import { Navbar } from '@/components/Navbar'
import React from 'react'
import CreateLandingPage from './CreateLandingPage'


export default async function Page (){
    return (
        <div>
            <Navbar />
            <CreateLandingPage />
        </div>
    )
}
