import { Navbar } from '@/components/Navbar'
import React from 'react'
import EditPage from './Editpage'


export default async function Page ({ params }: { params: { pageId: string } }){
    return (
        <div>
            <Navbar />
            <EditPage params={params} />
        </div>
    )
}
