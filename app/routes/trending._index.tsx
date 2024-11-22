import { tmdb } from "~/lib/tmdb.server"
import { useLoaderData } from "@remix-run/react"

import { LoaderFunctionArgs } from "@remix-run/node"

import { CardGrid } from "~/components/card-grid"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")

  const data = await tmdb.trending.trending("all", "day", { page })

  return data
}

export default function TrendingPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <main>
      <CardGrid
        className="max-w-4xl p-8 m-auto"
        items={data.results} 
      />
    </main>
  )
}