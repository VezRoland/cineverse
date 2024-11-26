import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from '@remix-run/react';
import type {
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';

import './tailwind.css';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { themeSessionResolver } from './sessions.server';
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from 'remix-themes';
import { cn } from './lib/utils';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>('root');

  return (
    <ThemeProvider
      specifiedTheme={data?.theme || null}
      themeAction="/action/set-theme"
    >
      <InnerLayout ssrTheme={Boolean(data?.theme)}>
        {children}
      </InnerLayout>
    </ThemeProvider>
  );
}

export default function App() {
  return <Outlet />;
}

function InnerLayout({
  ssrTheme,
  children,
}: {
  ssrTheme: boolean;
  children: React.ReactNode;
}) {
  const [theme] = useTheme();

  return (
    <html lang="en" data-theme={theme} className={cn(theme ?? '', "min-h-screen")}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body
        className="h-full min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <Navbar />
        <div className="w-full max-w-5xl flex-1 flex flex-col items-center gap-8 p-8 m-auto">
          {children}
        </div>
        <Footer />
        <ScrollRestoration />
        <PreventFlashOnWrongTheme ssrTheme={ssrTheme} />
        <Scripts />
      </body>
    </html>
  );
}
