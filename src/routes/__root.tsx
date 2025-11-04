import { Navbar01 } from '@/components/ui/shadcn-io/navbar-01';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});
const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
];

function RootComponent() {
  return (
    <>
      <Navbar01
        className="!bg-transparent text-gray-300 border-0 accent-green-400"
        navigationLinks={navigationLinks}
      />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
