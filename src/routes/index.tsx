import Experience from '@/components/IndexPage/Experience';
import Intro from '@/components/IndexPage/Intro';
// import Projects from '@/components/IndexPage/Projects';
import Skills from '@/components/IndexPage/Skills';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Intro />
      <Experience />
      <Skills />
      {/* <Projects /> */}
    </div>
  );
}
