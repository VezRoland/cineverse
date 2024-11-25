import { tmdb } from '~/lib/tmdb.server';
import { Link, useLoaderData } from '@remix-run/react';

import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { Season } from 'tmdb-ts';

import { Icon } from '@iconify/react';
import { Header } from '~/components/header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Rating } from '~/components/rating';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { VideoCarousel } from '~/components/video-carousel';
import { CastCarousel } from '~/components/cast-carousel';

interface ExtendedSeason extends Season {
  vote_average: number;
  vote_count: number;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) return null;

  try {
    const tvShow = await tmdb.tvShows.details(parseInt(params.id), [
      'videos',
      'credits',
      'reviews',
      'episode_groups',
    ]);
    return tvShow;
  } catch {
    return null;
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data ? data.name : "TV show can't be found"} | Cineverse` },
    { name: 'description', content: data ? `Find out more about ${data && data.name}.` : "" },
  ];
};

export default function TVShowPage() {
  const tvShow = useLoaderData<typeof loader>();

  if (!tvShow) {
    return (
      <main className="flex-1 grid place-items-center">
        <h1 className="text-4xl font-semibold">
          TV show can&apos;t be found!
        </h1>
      </main>
    );
  }

  const {
    name,
    genres,
    overview,
    backdrop_path,
    vote_average,
    vote_count,
    videos,
    status,
    number_of_seasons,
    number_of_episodes,
    first_air_date,
    last_air_date,
    seasons,
    credits,
  } = tvShow;
  const rating = Math.round((vote_average / 2) * 10) / 10;
  const trailers = videos.results.filter(
    (video) => video.type === 'Trailer'
  );

  return (
    <>
      <Header
        title={name}
        breadcrumbRoutes={[
          ['Home', '/'],
          ['TV Shows', '/tv-shows'],
          [name, ''],
        ]}
      />
      <main className="w-full flex-1 flex flex-col gap-8">
        <Card className="relative bg-transparent bg-gradient-to-b from-background to-transparent">
          <CardHeader className="flex-row flex-wrap justify-between items-center gap-4 space-y-0">
            <CardTitle>
              <h2 className="text-2xl font-semibold text-primary">
                About this TV show
              </h2>
            </CardTitle>
            <ul className="flex flex-wrap gap-2 overflow-auto">
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  className="flex-1"
                  variant="outline"
                  asChild
                >
                  <Link
                    className="text-xs"
                    to={`/tv-shows?genres=${genre.id}`}
                  >
                    {genre.name}
                  </Link>
                </Button>
              ))}
            </ul>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p>{overview || 'No overview was provided.'}</p>
            {trailers.length > 0 && (
              <VideoCarousel videos={trailers} />
            )}
            <img
              className="-z-10 absolute left-0 top-0 w-full h-full object-cover opacity-50 blur-lg rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
              alt={`Backdrop of ${name}`}
            />
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Rating rating={rating} />
              <span>
                {rating} / 5 ({vote_count})
              </span>
            </div>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Badge className="w-max flex gap-2">
                  {number_of_seasons > 0 && (
                    <>
                      {number_of_seasons} season
                      {number_of_seasons > 1 ? 's' : ''}
                    </>
                  )}
                </Badge>
              </li>
              <li>
                <Badge className="w-max flex gap-2">
                  {number_of_episodes > 0 && (
                    <>
                      {number_of_episodes} episode
                      {number_of_episodes > 1 ? 's' : ''}
                    </>
                  )}
                </Badge>
              </li>
              <li>
                <Badge
                  className="w-max flex gap-2"
                  variant="secondary"
                >
                  {status}
                </Badge>
              </li>
              <li>
                <Badge className="w-max flex gap-2" variant="outline">
                  <Icon icon="material-symbols:calendar-month" />
                  {new Date(first_air_date).toLocaleDateString(
                    'hu-HU'
                  )}{' '}
                  -{' '}
                  {status === 'Ended'
                    ? new Date(last_air_date).toLocaleDateString(
                        'hu-HU'
                      )
                    : ''}
                </Badge>
              </li>
            </ul>
          </CardFooter>
        </Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Season</TableHead>
              <TableHead>Episodes</TableHead>
              <TableHead>Aired at</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seasons.map((season) => (
              <TableRow key={season.id}>
                <TableCell>{season.name}</TableCell>
                <TableCell>
                  {season.episode_count
                    ? season.episode_count
                    : 'TBA'}
                </TableCell>
                <TableCell>
                  {season.air_date
                    ? new Date(season.air_date).toLocaleDateString(
                        'hu-HU'
                      )
                    : 'TBA'}
                </TableCell>
                <TableCell className="flex flex-wrap gap-2">
                  <span>
                    {Math.round(
                      ((season as ExtendedSeason).vote_average / 2) *
                        10
                    ) / 10}{' '}
                    / 5
                  </span>
                  <Rating
                    rating={
                      Math.round(
                        ((season as ExtendedSeason).vote_average /
                          2) *
                          10
                      ) / 10
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <CastCarousel cast={credits.cast} />
      </main>
    </>
  );
}
