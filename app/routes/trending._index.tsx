import { tmdb } from "~/lib/tmdb.server"
import { useLoaderData } from "@remix-run/react"

import { LoaderFunctionArgs } from "@remix-run/node"

import { Header } from "~/components/header"
import { CardGrid } from "~/components/card-grid"
import { Paginator } from "~/components/paginator"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")

  const media = await tmdb.trending.trending("all", "day", { page })

  return media
}

export default function TrendingPage() {
  const media = useLoaderData<typeof loader>()

  return (
    <>
      <Header
        title="Trending"
        description="Discover what's trending in movies and TV shows today, all in one place."
      />
      <main className="w-full max-w-4xl flex-1">
        <CardGrid items={media.results} />
      </main>
      <Paginator totalPages={media.total_pages} />
    </>
  )
}