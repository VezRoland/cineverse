import { Movie, TV, Person, MediaType } from "tmdb-ts"

import { MediaCard } from "~/components/media-card"

interface ExtendedMovie extends Movie { media_type?: MediaType }
interface ExtendedTV extends TV { media_type?: MediaType }
interface ExtendedPerson extends Person { media_type?: MediaType }

export const CardGrid = ({
  items,
  mediaType
}: {
  items: ( ExtendedMovie | ExtendedTV | ExtendedPerson)[],
  mediaType?: MediaType
}) => {

  return (
    <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(theme(width.44),1fr))] auto-rows-fr gap-4">
      {items.map(media => (
        [media.media_type, mediaType].includes("movie") ? (
          <MediaCard 
            key={media.id} 
            id={media.id}
            title={(media as Movie).title}
            rating={Math.round(((media as Movie).vote_average / 2) * 10) / 10}
            posterPath={(media as Movie).poster_path}
            baseUrl="/movies"
          />
        ) :
        [media.media_type, mediaType].includes("tv") ? (
          <MediaCard
            key={media.id}
            id={media.id}
            rating={Math.round(((media as TV).vote_average / 2) * 10) / 10}
            title={(media as TV).name}
            posterPath={(media as TV).poster_path}
            baseUrl="/tv-shows"
          />
        ) : null
      ))} 
      {items.length < 4 ? (
        new Array(4 - items.length).fill(null).map(() => (
          <div key={crypto.randomUUID()}></div>
        ))
      ) : null}
    </section>
  )
}