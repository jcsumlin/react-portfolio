import { Navbar } from '@/components/ui/shadcn-io/navbar-01';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});
const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

function RootComponent() {
  return (
    <div className="bg-white dark:bg-slate-950 text-foreground min-h-screen">
      <Navbar
        className="bg-transparent! text-gray-300 border-0 accent-green-400"
        navigationLinks={navigationLinks}
      />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
