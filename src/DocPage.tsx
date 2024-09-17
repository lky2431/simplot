import Header from "./components/home/header"
import { Link } from '@tanstack/react-router'
import { Separator } from "./components/ui/separator"
import { ReactNode } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"


const DocPage = ({ children }: { children: ReactNode }) => {
    return <div className='relative min-w-screen min-h-screen m-0 flex flex-col bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'>
        <Header />
        <Separator />
        <div className="flex mt-2 h-[calc(100vh-6rem)]">
            <div className="min-w-48 flex flex-col p-4 gap-4">
                <Link to="/doc/concept">Concept</Link>
                <Link to="/doc/start">Get Started</Link>
                <Link to='/doc/styling'>Styling</Link>
                <Link to="/doc/advanced">Advaned Chart</Link>
                <Link to="/doc/all">All together</Link>
            </div>
            <Separator orientation="vertical" />
            <div className="grow p-4"><ScrollArea className="h-full">{children}</ScrollArea></div>
        </div>



    </div>

}

export default DocPage