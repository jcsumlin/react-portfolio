import Experience from '@/components/Experience'
import Intro from '@/components/Intro'
import Projects from '@/components/Projects'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='w-full md:w-3/4 md:mx-auto px-8'>
      <Intro />
      <hr className="my-12" />
      {/* <Projects />
      <hr className="my-12" /> */}

      <Experience />
    </div>
  )
}


