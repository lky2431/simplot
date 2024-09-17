import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Authenticated, Unauthenticated, useQuery } from "convex/react";

const Header = () => {
    return <div className="sticky top-0">
        <header className="flex h-16 w-full items-center px-6 md:px-8">
            <img src="/favicon.svg" className='h-8' />
            <Label className='ml-3 font-bold text-xl'>Simplot</Label>
            <div className="ml-auto flex gap-2">
                <Link
                    to="/"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                >
                    Home
                </Link>
                <Link
                    to="/doc/concept"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                >
                    Document
                </Link>
                <Authenticated>
                    <Link to="/dashboard" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
                        Dashboard
                    </Link>
                </Authenticated>
                <Unauthenticated>
                    <Link to="/login" className="[&.active]:font-bold">
                        <Button className="justify-self-end px-2 py-1 text-xs">
                            Sign in
                        </Button>
                    </Link>
                </Unauthenticated>
            </div>
        </header>
    </div>
}

export default Header