import { tmdb } from "~/lib/tmdb.server"
import { useLoaderData } from "@remix-run/react"

import { LoaderFunctionArgs } from "@remix-run/node"

import { Icon } from "@iconify/react"
import { Header } from "~/components/header"
import { CardGrid } from "~/components/card-grid"
import { Paginator } from "~/components/paginator"
import { GenreFilter } from "~/components/genre-filter"
import { Separator } from "~/components/ui/separator"
import { LoadingWrapper } from "~/components/loading-wrapper"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const with_genres = searchParams.get("genres")

  const media = with_genres ? (
    await tmdb.discover.tvShow({ page, with_genres })
  ) : (
    await tmdb.discover.tvShow({ page })
  )
  const { genres } = await tmdb.genres.tvShows()

  return { media, genres }
}

export default function TVShowsPage() {
  const { media: { results, total_pages }, genres } = useLoaderData<typeof loader>()

  return (
    <>
      <Header
        title="TV Shows"
        description="Discover new favorites from a huge selection of TV shows"
      />
      <Separator className="max-w-4xl" />
      <main className="w-full max-w-4xl flex-1 flex flex-col gap-8">
        <GenreFilter items={genres} />
        <LoadingWrapper>
          {results.length > 0 ? (
            <CardGrid items={results} mediaType="tv" />
          ) : (
            <div className="relative flex-1 flex justify-center items-center gap-4">
              <Icon
                icon="material-symbols:sentiment-sad-rounded"
                className="-z-10 absolute text-9xl text-muted"
              />
              <p>There isn&apos;t any TV show to display</p>
            </div>
          )}
        </LoadingWrapper>
      </main>
      <Paginator totalPages={total_pages} />
    </>
  )
}