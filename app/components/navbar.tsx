import { Link, useLocation } from '@remix-run/react';
import clsx from 'clsx';

import { Icon } from '@iconify/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { Logo } from '~/components/logo';
import { LoadBar } from '~/components/load-bar';

const pages = [
  {
    name: 'Home',
    icon: <Icon icon="material-symbols:home-rounded" />,
    path: '/',
  },
  {
    name: 'Trending',
    icon: <Icon icon="material-symbols:trending-up-rounded" />,
    path: '/trending',
  },
  {
    name: 'Movies',
    icon: <Icon icon="material-symbols:movie-rounded" />,
    path: '/movies',
  },
  {
    name: 'TV Shows',
    icon: <Icon icon="material-symbols:tv-gen-rounded" />,
    path: '/tv-shows',
  },
  {
    name: 'Search',
    icon: <Icon icon="material-symbols:search-rounded" />,
    path: '/search',
  },
];

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="z-50 sticky top-0 max-w-full h-16 flex items-center px-8 border-b border-border bg-background/75 backdrop-blur-lg">
      <div className="relative w-1/4">
        <Sheet key={crypto.randomUUID()}>
          <SheetTrigger className="block md:hidden">
            <Icon
              className="text-2xl"
              icon="material-symbols:menu-rounded"
            />
          </SheetTrigger>
          <SheetContent className="w-full max-w-sm" side="left">
            <SheetHeader>
              <Logo />
            </SheetHeader>
            <ul className="flex flex-col py-8">
              {pages.map((page) => (
                <li key={page.name}>
                  <Button
                    asChild
                    variant="ghost"
                    className={clsx(
                      `/${pathname.split('/').at(1)}` === page.path
                        ? 'text-primary hover:text-primary-foreground hover:bg-primary'
                        : '',
                      'w-full justify-start'
                    )}
                  >
                    <Link to={page.path}>
                      {page.icon}
                      {page.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
        <div className="hidden md:block">
          <Logo />
        </div>
      </div>
      <span className="w-max block md:hidden py-2 m-auto font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
        {pages.find((page) => page.path === pathname)?.name}
      </span>
      <ul className="hidden md:flex flex-1 justify-center gap-2">
        {pages.map((page) => (
          <li key={page.name}>
            <Button
              asChild
              variant="ghost"
              className={
                `/${pathname.split('/').at(1)}` === page.path
                  ? 'text-primary hover:text-primary-foreground hover:bg-primary'
                  : ''
              }
            >
              <Link to={page.path}>
                {page.icon}
                {page.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
      <div className="w-1/4"></div>
      <div className="absolute left-0 bottom-0 w-full">
        <LoadBar />
      </div>
    </nav>
  );
};
