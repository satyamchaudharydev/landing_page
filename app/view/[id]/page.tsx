import { Navbar } from '@/components/Navbar'
import ViewPage from './ViewPage'

export default async function Page ({ params }: { params: { id: string } }){
    return (
        <div>
            <Navbar />
            <ViewPage params={params} />
        </div>
    )
}
