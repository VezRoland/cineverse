import { Link } from "@remix-run/react"
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
      className="flex"
      to={`${baseUrl}/${id}`}
    >    
      <Card className="overflow-clip">
        <CardHeader className="p-0">
          <img
            className="aspect-[2/3]"
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            alt={`Poster of ${title}`}
          />
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle>
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  )
}