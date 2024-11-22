import { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { tmdb } from "~/lib/tmdb.server"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return null

  try {
    const movie = await tmdb.movies.details(parseInt(params.id))
    return movie
  } catch {
    return null
  }
}

export default function MoviePage() {
  const movie = useLoaderData<typeof loader>()

  if (!movie) {
    return (
      <h1>ANYÁD!</h1>
    )
  }

  return (
    <h1>{movie.title}</h1>
  )
}