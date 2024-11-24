import Autoplay from "embla-carousel-autoplay"

import { Cast } from "tmdb-ts"

import { Icon } from "@iconify/react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"

export const CastCarousel = ({ cast }: { cast: Cast[] }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">Cast</h2>
        <span className="text-sm">{cast.length} actor{cast.length > 1 ? "s" : ""}</span>
      </div>
      <Carousel
        className="
          before:z-10 before:absolute before:left-0 before:top-0 before:w-1/6 before:h-full before:bg-gradient-to-l before:from-transparent before:to-background
          after:absolute after:right-0 after:top-0 after:w-1/6 after:h-full after:bg-gradient-to-r after:from-transparent after:to-background
          "
        plugins={[
          Autoplay({
            delay: 2000
          })
        ]}
      >
        <CarouselContent>
          {cast.map(actor => (
            <CarouselItem
              key={actor.id}
              className="flex flex-col basis-1/4 md:basis-1/6 items-center gap-2 mx-auto"
            >
              {
                actor.profile_path ? (
                  <img
                    className="w-full h-max aspect-square object-cover rounded-full"
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} 
                    alt={`${actor.name}`}
                  />
                ) : (
                  <div className="w-full h-max aspect-square grid place-items-center rounded-full bg-muted">
                    <Icon className="text-5xl text-muted-foreground" icon="material-symbols:person-rounded" />
                  </div>
                )
              }
              <span className="text-center font-semibold">{actor.name}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
        {
          cast.length > 1 &&
          <>
            <CarouselPrevious className="z-10 left-0 -translate-x-1/2" />
            <CarouselNext className="z-10 right-0 translate-x-1/2" />
          </>
        }
      </Carousel>
    </section>
  )
}