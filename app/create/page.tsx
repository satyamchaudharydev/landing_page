import { Navbar } from '@/components/Navbar'
import React from 'react'
import CreateLandingPage from './createLandingPage'


export default async function Page (){
    return (
        <div>
            <Navbar />
            <CreateLandingPage />
        </div>
    )
}
