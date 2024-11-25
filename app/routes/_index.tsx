import type { MetaFunction } from '@remix-run/node';
import { Logo } from '~/components/logo';
import { PageCard } from '~/components/page-card';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

export const meta: MetaFunction = () => {
  return [
    { title: 'Cineverse' },
    { name: 'description', content: 'Welcome to Cineverse!' },
  ];
};

export default function Index() {
  return (
    <>
      <header className="w-full">
        <Card className="relative bg-card/75">
          <CardHeader className="aspect-video flex flex-col justify-center items-center gap-4">
            <Logo />
            <CardTitle>
              <h1 className="text-6xl font-bold">Cineverse</h1>
            </CardTitle>
            <CardDescription>
              <p className="max-w-80 text-center">
                A collection of TMDB movies and TV shows made into a
                simplistic web application.
                <br />
              </p>
            </CardDescription>
          </CardHeader>
          <div className="-z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] aspect-square rounded-full blur-3xl bg-gradient-to-r from-primary to-accent"></div>
        </Card>
      </header>
      <main className="w-full grid md:grid-cols-2 flex-1 gap-8">
        <PageCard
          className="md:col-span-2"
          title="Trending Movies & TV Shows"
          description="Are you curious about today's trends? Search through a vast selection of trending movies and TV series streamed all over the world on this day."
          href="/trending"
        />
        <PageCard
          title="Discover Movies"
          description="Craving to find new movies? Pick your favorites from a big selection of movies."
          href="/movies"
        />
        <PageCard
          title="Discover TV Shows"
          description="Binged through all of your TV Shows? Find new binge-worthy TV Shows from hundreds of series."
          href="/tv-shows"
        />
      </main>
    </>
  );
}
