import { tmdb } from "~/lib/tmdb.server"
import { Link, useLoaderData } from "@remix-run/react"

import { LoaderFunctionArgs } from "@remix-run/node"

import { Header } from "~/components/header"
import { CardGrid } from "~/components/card-grid"
import { Paginator } from "~/components/paginator"
import { GenreFilter } from "~/components/genre-filter"
import { Separator } from "~/components/ui/separator"
import { LoadingWrapper } from "~/components/loading-wrapper"
import { Button } from "~/components/ui/button"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const with_genres = searchParams.get("genres")

  const media = with_genres ? (
    await tmdb.discover.movie({ page, with_genres })
  ) : (
    await tmdb.discover.movie({ page })
  )
  const { genres } = await tmdb.genres.movies()

  return { media, genres }
}

export default function MoviesPage() {
  const { media: { results, total_pages }, genres } = useLoaderData<typeof loader>()

  return (
    <>
      <Header
        title="Movies"
        description="Discover new favorites from a huge selection of movies"
        breadcrumbRoutes={[[ "Home", "/" ], [ "Movies", "" ]]}
      />
      <Separator />
      <main className="w-full flex-1 flex flex-col gap-8">
        <GenreFilter items={genres} />
        <LoadingWrapper>
          {results.length > 0 ? (
            <CardGrid items={results} mediaType="movie" />
          ) : (
            <div className="relative flex-1 flex flex-col justify-center items-center">
              <p className="text-xl">There isn&apos;t any movie to display.</p>
              <Button
                variant="link"
                asChild
              >
                <Link to="/movies">
                  Show all movies
                </Link>
              </Button>
            </div>
          )}
        </LoadingWrapper>
      </main>
      <Paginator totalPages={total_pages} />
    </>
  )
}