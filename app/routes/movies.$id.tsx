import { tmdb } from "~/lib/tmdb.server"
import { Link, useLoaderData } from "@remix-run/react"
import { formatTime } from "~/lib/utils"

import { LoaderFunctionArgs } from "@remix-run/node"

import { Icon } from "@iconify/react"
import { Header } from "~/components/header"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { VideoCarousel } from "~/components/video-carousel"
import { Badge } from "~/components/ui/badge"
import { CastCarousel } from "~/components/cast-carousel"
import { Rating } from "~/components/rating"
import { Button } from "~/components/ui/button"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return null

  try {
    const movie = await tmdb.movies.details(parseInt(params.id), [ "videos", "credits", "reviews" ])
    return movie
  } catch {
    return null
  }
}

export default function MoviePage() {
  const movie = useLoaderData<typeof loader>()

  if (!movie) {
    return (
      <main className="flex-1 grid place-items-center">
        <h1 className="text-4xl font-semibold">Movie can&apos;t be found!</h1>
      </main>
    )
  }

  const rating = Math.round((movie.vote_average / 2) * 10) / 10
  const trailers = movie.videos.results.filter(video => video.type === "Trailer")

  return (
    <>
      <Header
        title={movie.title}
        breadcrumbRoutes={[[ "Home", "/" ], [ "Movies", "/movies" ], [ movie.title, "" ]]}
      />
      <main className="w-full flex-1 flex flex-col gap-8">
        <Card className="relative bg-transparent bg-gradient-to-b from-background to-transparent">
          <CardHeader className="flex-row justify-between items-center space-y-0">
            <CardTitle>
              <h2 className="text-2xl font-semibold text-primary">About this movie</h2>
            </CardTitle>
            <ul className="flex gap-2">
              {movie.genres.map(genre => (
                <Button
                  key={genre.id}
                  variant="outline"
                  asChild
                >
                  <Link className="text-xs" to={`/movies?genres=${genre.id}`}>
                    {genre.name}
                  </Link>
                </Button>
              ))}
            </ul>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>{movie.overview || "No overview was provided."}</p>
            { trailers.length > 0 && <VideoCarousel videos={trailers} /> }
            <img
              className="-z-10 absolute left-0 top-0 w-full h-full object-cover opacity-50 blur-lg rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={`Backdrop of ${movie.title}`}
            />
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Rating rating={rating} />
              <span>{rating} / 5 ({movie.vote_count})</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Badge className="w-max flex gap-2">
                  <Icon icon="material-symbols:clock-loader-90" />
                  <span>{movie.runtime ? formatTime(movie.runtime) : "Unknown"}</span>
                </Badge>
              </li>
              <li>
                <Badge className="w-max flex gap-2" variant="secondary">
                  {movie.status}
                </Badge>
              </li>
              <li>
                <Badge className="w-max flex gap-2" variant="outline">
                  <Icon icon="material-symbols:calendar-month" />
                  <span>{movie.release_date ? new Date(movie.release_date).toLocaleDateString("hu-HU") : "TBA"}</span>
                </Badge>
              </li>
            </ul>
          </CardFooter>
        </Card>
        <CastCarousel cast={movie.credits.cast} />
      </main>
    </>
  )
}