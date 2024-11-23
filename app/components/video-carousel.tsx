import { Video } from "tmdb-ts"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { YTVideo } from "~/components/yt-video"

export const VideoCarousel = ({ videos }: { videos: Video[] }) => {
  return (
    <Carousel>
      <CarouselContent>
        {videos.map(video => (
          <CarouselItem className="m-auto" key={video.id}>
            <YTVideo src={`https://www.youtube.com/embed/${video.key}`} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-10 left-0 -translate-x-1/2" />
      <CarouselNext className="z-10 right-0 translate-x-1/2" />
    </Carousel>
  )
}