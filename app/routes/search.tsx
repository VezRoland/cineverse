import { tmdb } from '~/lib/tmdb.server';
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react';
import { TMDB_MIN_PAGE_AMOUNT } from '~/lib/tmdb.config';

import { LoaderFunctionArgs } from '@remix-run/node';
import { FormEvent } from 'react';

import { Icon } from '@iconify/react';
import { Header } from '~/components/header';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { LoadingWrapper } from '~/components/loading-wrapper';
import { CardGrid } from '~/components/card-grid';
import { Paginator } from '~/components/paginator';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page =
    Number(searchParams.get('page')) || TMDB_MIN_PAGE_AMOUNT;

  const media = await tmdb.search.multi({
    query: query || 'a',
    page,
  });

  return { media, query };
};

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { media, query } = useLoaderData<typeof loader>();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const query = formData.get('query')?.toString().trim();

    if (!query) return;

    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('page');
    searchParams.set('query', query);

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const { results, total_pages } = media;

  return (
    <>
      <Header
        title="Search"
        breadcrumbRoutes={[
          ['Home', '/'],
          ['Search', ''],
        ]}
      />
      <nav className="w-full">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <Input
            key={query}
            className="flex-1"
            type="search"
            name="query"
            placeholder="Type in the title of a movie or TV show"
            defaultValue={query || ''}
          />
          <Button size="icon">
            <Icon icon="material-symbols:search-rounded" />
          </Button>
        </form>
      </nav>
      <main className="w-full flex-1 flex flex-col">
        <LoadingWrapper>
          {results.length > 0 ? (
            <CardGrid items={results} />
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <p className="text-xl">No results</p>
              <Button variant="link" asChild>
                <Link to="/search">Clear the search query</Link>
              </Button>
            </div>
          )}
        </LoadingWrapper>
      </main>
      <Paginator totalPages={total_pages} />
    </>
  );
}
