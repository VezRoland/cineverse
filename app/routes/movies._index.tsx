import { getMovies, tmdb } from '~/lib/tmdb.server';
import { Link, redirect, useLoaderData } from '@remix-run/react';
import { TMDB_MIN_PAGE_AMOUNT } from '~/lib/tmdb.config';

import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

import { Header } from '~/components/header';
import { CardGrid } from '~/components/card-grid';
import { Paginator } from '~/components/paginator';
import { GenreFilter } from '~/components/genre-filter';
import { Separator } from '~/components/ui/separator';
import { LoadingWrapper } from '~/components/loading-wrapper';
import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Movies | Cineverse' },
    { name: 'description', content: 'Find your personal favorites from a vast selection of movies.' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page =
    Number(searchParams.get('page')) || TMDB_MIN_PAGE_AMOUNT;
  const genres = searchParams.get('genres');

  const { data: movies, errorRedirect } = await getMovies({
    page,
    genres,
  });
  if (errorRedirect) return redirect(errorRedirect);

  const { genres: movieGenres } = await tmdb.genres.movies();

  return { movies, genres: movieGenres };
};

export default function MoviesPage() {
  const { movies, genres } = useLoaderData<typeof loader>();

  return (
    <>
      <Header
        title="Movies"
        description="Discover new favorites from a huge selection of movies"
        breadcrumbRoutes={[
          ['Home', '/'],
          ['Movies', ''],
        ]}
      />
      <Separator />
      <main className="w-full flex-1 flex flex-col gap-8">
        <GenreFilter items={genres} />
        <LoadingWrapper>
          {movies && movies.results.length > 0 ? (
            <CardGrid items={movies.results} mediaType="movie" />
          ) : (
            <div className="relative flex-1 flex flex-col justify-center items-center">
              <p className="text-xl">
                There isn&apos;t any movie to display.
              </p>
              <Button variant="link" asChild>
                <Link to="/movies">Show all movies</Link>
              </Button>
            </div>
          )}
        </LoadingWrapper>
      </main>
      {movies && movies.total_pages > 1 && (
        <Paginator totalPages={movies.total_pages} />
      )}
    </>
  );
}
