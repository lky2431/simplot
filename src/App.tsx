
import { Label } from './components/ui/label'
import { Link } from '@tanstack/react-router'
import Header from './components/home/header'
import { Button } from './components/ui/button'


function App() {

  return (
    <>
      <div className='relative min-w-screen min-h-screen m-0 flex flex-col bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]'>
        <Header />
        <div className='flex flex-col justify-start items-center h-screen m-0'>
          <div className='h-12'></div>
          <div className='relative'>
            <img src="images/hero.png" className='w-96 h-96 '></img>
            <Label className='absolute m-auto inset-y-0 w-max h-max text-center inset-x-0 font-bold text-6xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-400 bg-clip-text text-transparent'>Simplot</Label>
          </div>
          <div className='h-12'></div>
          <Label className='text-lg text-neutral-300'>node based graph plotting software</Label>
          <div className='h-8'></div>
          <Link to="/login" className="[&.active]:font-bold">
            <Button className='rounded-full shadow-2xl shadow-primary'>
              GET STARTED
            </Button>
          </Link>
        </div>
      </div>

    </>
  )
}

export default App
