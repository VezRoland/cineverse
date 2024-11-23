import { Link } from "@remix-run/react"

import { Icon } from "@iconify/react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Rating } from "./rating"

export const MediaCard = ({
  id,
  title,
  rating,
  posterPath,
  baseUrl
}: {
  id: number,
  title: string,
  rating: number,
  posterPath: string,
  baseUrl: string
}) => {
  return (
    <Link
      className="w-full flex group"
      to={`${baseUrl}/${id}`}
    >    
      <Card
        className="w-full flex flex-col overflow-clip shadow-2xl shadow-transparent
          group-focus:shadow-2xl group-focus:shadow-accent/50
          group-hover:shadow-2xl group-hover:shadow-accent/50
          transition-[box-shadow] duration-300"
      >
        <CardHeader className="p-0 border-b border-border">
          {
            posterPath ? (
              <img
                className="aspect-[2/3]"
                src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
                alt={`Poster of ${title}`}
              />
            ) : (
              <div className="grid place-items-center aspect-[2/3] bg-muted">
                <Icon
                  className="text-7xl text-muted-foreground"
                  icon="material-symbols:broken-image-rounded"
                />
              </div>
            )
          }
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-between items-center gap-2 p-6 text-center">
          <CardTitle>
            {title}
          </CardTitle>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="text-sm">{rating} / 5</span>
            <Rating className="text-xl" rating={rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}