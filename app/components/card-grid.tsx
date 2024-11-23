import { Movie, TV, Person, MediaType } from "tmdb-ts"

import { MediaCard } from "~/components/media-card"

interface ExtendedMovie extends Movie { media_type?: MediaType }
interface ExtendedTV extends TV { media_type?: MediaType }
interface ExtendedPerson extends Person { media_type?: MediaType }

export const CardGrid = ({
  items,
  mediaType
}: {
  items: (ExtendedMovie | ExtendedTV | ExtendedPerson)[],
  mediaType?: MediaType
}) => {

  return (
    <section className="w-full grid grid-cols-[repeat(auto-fit,minmax(theme(width.44),1fr))] auto-rows-fr gap-4">
      {items.map(item => (
        [item.media_type, mediaType].includes("movie") ? (
          <MediaCard 
            key={item.id} 
            id={item.id}
            title={(item as Movie).title}
            rating={Math.round(((item as Movie).vote_average / 2) * 10) / 10}
            posterPath={(item as Movie).poster_path}
            baseUrl="/movies"
          />
        ) :
        [item.media_type, mediaType].includes("tv") ? (
          <MediaCard
            key={item.id}
            id={item.id}
            rating={Math.round(((item as TV).vote_average / 2) * 10) / 10}
            title={(item as TV).name}
            posterPath={(item as TV).poster_path}
            baseUrl="/series"
          />
        ) : null
      ))}
    </section>
  )
}