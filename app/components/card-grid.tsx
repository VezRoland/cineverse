import clsx from "clsx"

import { Movie as M, TV as T, Person as P, MediaType } from "tmdb-ts"

import { MediaCard } from "~/components/media-card"

interface Movie extends M { media_type: MediaType }
interface TV extends T { media_type: MediaType }
interface Person extends P { media_type: MediaType }

export const CardGrid = ({
  items,
  className = ""
}: {
  items: (Movie | TV | Person)[],
  className?: string
}) => {
  return (
    <section className={clsx(
      className,
      "grid grid-cols-[repeat(auto-fit,minmax(156px,1fr))] auto-rows-fr gap-4"
    )}>
      {items.map(item => (
        item.media_type === "movie" ? (
          <MediaCard 
            key={item.id} 
            id={item.id}
            title={(item as Movie).title}
            posterPath={(item as Movie).poster_path}
            baseUrl="/movies"
          />
        ) :
        item.media_type === "tv" ? (
          <MediaCard
            key={item.id}
            id={item.id}
            title={(item as TV).name}
            posterPath={(item as TV).poster_path}
            baseUrl="/series"
          />
        ) : null
      ))}
    </section>
  )
}