import { Navbar } from '@/components/ui/shadcn-io/navbar-01';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});
const navigationLinks = [
  { href: '/', label: 'Home' },
  // { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/login', label: 'Login' },
];

function RootComponent() {
  return (
    <div className="bg-white dark:bg-slate-950 text-foreground min-h-screen">
      <Navbar
        className="bg-transparent! text-gray-300 border-0 accent-green-400"
        navigationLinks={navigationLinks}
      />
      <div className="w-full md:w-3/4 md:mx-auto px-8">
        <Outlet />
      </div>
    </div>
  );
}
