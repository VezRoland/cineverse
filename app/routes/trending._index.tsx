import { getTrending } from '~/lib/tmdb.server';
import { Link, redirect, useLoaderData } from '@remix-run/react';
import { TMDB_MIN_PAGE_AMOUNT } from '~/lib/tmdb.config';
import { TRENDING_PAGE_BASE_URL } from '~/lib/pages.config';

import { LoaderFunctionArgs } from '@remix-run/node';

import { Header } from '~/components/header';
import { CardGrid } from '~/components/card-grid';
import { Paginator } from '~/components/paginator';
import { LoadingWrapper } from '~/components/loading-wrapper';
import { Button } from '~/components/ui/button';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page =
    Number(searchParams.get('page')) || TMDB_MIN_PAGE_AMOUNT;

  const { data, errorRedirect } = await getTrending({ page });
  if (errorRedirect) return redirect(errorRedirect);

  return data;
};

export default function TrendingPage() {
  const media = useLoaderData<typeof loader>();

  return (
    <>
      <Header
        title="Trending"
        description="Discover what's trending in movies and TV shows today, all in one place."
        breadcrumbRoutes={[
          ['Home', '/'],
          ['Trending', ''],
        ]}
      />
      <main className="w-full flex-1 flex">
        {media && media.results.length > 0 ? (
          <LoadingWrapper>
            <CardGrid items={media.results} />
          </LoadingWrapper>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-xl">
              There aren&apos;t any trending movies or TV shows to
              display.
            </p>
            <Button variant="link" asChild>
              <Link to={TRENDING_PAGE_BASE_URL}>
                Show all trending movies & TV shows
              </Link>
            </Button>
          </div>
        )}
      </main>
      {media && media.total_pages > 1 && (
        <Paginator totalPages={media.total_pages} />
      )}
    </>
  );
}
