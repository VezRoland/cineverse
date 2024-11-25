import { getTVShows, tmdb } from '~/lib/tmdb.server';
import { Link, redirect, useLoaderData } from '@remix-run/react';
import { TMDB_MIN_PAGE_AMOUNT } from '~/lib/tmdb.config';

import { LoaderFunctionArgs } from '@remix-run/node';

import { Header } from '~/components/header';
import { CardGrid } from '~/components/card-grid';
import { Paginator } from '~/components/paginator';
import { GenreFilter } from '~/components/genre-filter';
import { Separator } from '~/components/ui/separator';
import { LoadingWrapper } from '~/components/loading-wrapper';
import { Button } from '~/components/ui/button';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page =
    Number(searchParams.get('page')) || TMDB_MIN_PAGE_AMOUNT;
  const genres = searchParams.get('genres');

  const { data: tvShows, errorRedirect } = await getTVShows({
    page,
    genres,
  });
  if (errorRedirect) return redirect(errorRedirect);

  const { genres: tvShowGenres } = await tmdb.genres.tvShows();

  return { tvShows, genres: tvShowGenres };
};

export default function TVShowsPage() {
  const { tvShows, genres } = useLoaderData<typeof loader>();

  return (
    <>
      <Header
        title="TV Shows"
        description="Discover new favorites from a huge selection of TV shows"
        breadcrumbRoutes={[
          ['Home', '/'],
          ['TV Shows', ''],
        ]}
      />
      <Separator />
      <main className="w-full flex-1 flex flex-col gap-8">
        <GenreFilter items={genres} />
        <LoadingWrapper>
          {tvShows && tvShows.results.length > 0 ? (
            <CardGrid items={tvShows.results} mediaType="tv" />
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-xl">
                There isn&apos;t any TV show to display.
              </p>
              <Button variant="link" asChild>
                <Link to="/tv-shows">Show all TV Shows</Link>
              </Button>
            </div>
          )}
        </LoadingWrapper>
      </main>
      {tvShows && tvShows.total_pages > 1 && (
        <Paginator totalPages={tvShows.total_pages} />
      )}
    </>
  );
}
