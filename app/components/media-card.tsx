import { Link } from "@remix-run/react"

import { Icon } from "@iconify/react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"

export const MediaCard = ({
  id,
  title,
  posterPath,
  baseUrl
}: {
  id: number,
  title: string,
  posterPath: string,
  baseUrl: string
}) => {
  return (
    <Link
      className="w-full flex group"
      to={`${baseUrl}/${id}`}
    >    
      <Card
        className="w-full flex flex-col overflow-clip shadow-lg shadow-transparent
          group-focus:shadow-lg group-focus:shadow-accent
          group-hover:shadow-lg group-hover:shadow-accent
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
              <div className="grid place-items-center aspect-[2/3] bg-card">
                <Icon
                  className="text-7xl text-muted"
                  icon="material-symbols:question-mark-rounded"
                />
              </div>
            )
          }
        </CardHeader>
        <CardContent className="flex-1 flex items-center p-6">
          <CardTitle>
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  )
}