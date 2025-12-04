'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import { Link, useLocation } from '@tanstack/react-router';
import { ThemeToggle } from '@/components/ThemeToggle';

// Types
interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}

interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  navigationLinks: Navbar01NavLink[];
  logo?: React.ReactNode;
  logoHref?: string;
}

export const Navbar = React.forwardRef<HTMLElement, Navbar01Props>(
  ({ className, navigationLinks, ...props }, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
      let timeoutId: number;

      const checkWidth = () => {
        // Debounce the check to avoid excessive calls
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            const shouldBeMobile = width < 768; // 768px is md breakpoint
            // Only update state if it actually changed
            setIsMobile((prevIsMobile) => {
              if (prevIsMobile !== shouldBeMobile) {
                return shouldBeMobile;
              }
              return prevIsMobile;
            });
          }
        }, 16); // ~60fps throttling
      };

      // Use requestAnimationFrame for initial check to avoid blocking the main thread
      const initialCheck = () => {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            setIsMobile(width < 768);
          }
        });
      };

      initialCheck();

      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        clearTimeout(timeoutId);
        resizeObserver.disconnect();
      };
    }, []);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    return (
      <header
        ref={combinedRef}
        className={cn(
          'sticky top-0 z-50 w-full backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 **:no-underline',
          className,
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <MenuIcon
                      className="h-5 w-5"
                      aria-label="Open navigation menu"
                    />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <Link to={link.href} key={index}>
                          <NavigationMenuItem key={index} className="w-full">
                            <button
                              className={cn(
                                'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent cursor-pointer no-underline',
                                location.pathname === link.href
                                  ? 'bg-accent'
                                  : 'text-foreground/80',
                              )}
                            >
                              {link.label}
                            </button>
                          </NavigationMenuItem>
                        </Link>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            {/* Main nav */}
            <div className="flex items-center gap-6">
              {/* Navigation menu */}
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1 min-w-full">
                    {navigationLinks.map((link, index) => (
                      <Link to={link.href} key={index}>
                        <NavigationMenuItem key={index}>
                          <button
                            className={cn(
                              'hover:text-accent-foreground text-muted-foreground group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline',
                              location.pathname === link.href
                                ? 'bg-accent text-accent-foreground'
                                : '',
                            )}
                          >
                            {link.label}
                          </button>
                        </NavigationMenuItem>
                      </Link>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link to="/contact">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-muted-foreground font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Get in touch
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  },
);

Navbar.displayName = 'Navbar01';
