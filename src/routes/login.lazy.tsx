import { createLazyFileRoute } from '@tanstack/react-router'
import { SignIn } from '@clerk/clerk-react'

export const Route = createLazyFileRoute('/login')({
  component: () => <div className='w-screen h-screen flex flex-col justify-center items-center'>
    <SignIn forceRedirectUrl={"/dashboard"} fallbackRedirectUrl={"/dashboard"}/>
    </div>
})