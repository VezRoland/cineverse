import 'dotenv/config'
import { ErrorResponse, TMDB } from 'tmdb-ts';
import {
  MOVIES_PAGE_BASE_URL,
  TRENDING_PAGE_BASE_URL,
  TV_SHOWS_PAGE_BASE_URL,
} from './pages.config';
import { TMDB_MAX_PAGE_AMOUNT } from '~/lib/tmdb.config';

export const tmdb = new TMDB(process.env.API_TOKEN!);

export const getTrending = async ({ page }: { page: number }) => {
  try {
    const trending = await tmdb.trending.trending('all', 'day', {
      page,
    });
    return { data: trending, errorRedirect: null };
  } catch (error) {
    const { status_code } = error as ErrorResponse;
    const searchParams = new URLSearchParams();

    if (status_code === 22) {
      if (page > TMDB_MAX_PAGE_AMOUNT)
        searchParams.set('page', String(TMDB_MAX_PAGE_AMOUNT));
      else searchParams.delete('page');

      return {
        data: null,
        errorRedirect: searchParams.toString()
          ? `${TRENDING_PAGE_BASE_URL}?${searchParams.toString()}`
          : TRENDING_PAGE_BASE_URL,
      };
    }

    return { data: null, errorRedirect: TRENDING_PAGE_BASE_URL };
  }
};

export const getMovies = async ({
  page,
  genres,
}: {
  page: number;
  genres: string | null;
}) => {
  try {
    const movies = await tmdb.discover.movie({
      page,
      ...(genres ? { with_genres: genres } : {}),
    });
    return { data: movies, errorRedirect: null };
  } catch (error) {
    const { status_code } = error as ErrorResponse;
    const searchParams = new URLSearchParams();

    if (status_code === 22) {
      if (page > TMDB_MAX_PAGE_AMOUNT)
        searchParams.set('page', String(TMDB_MAX_PAGE_AMOUNT));
      else searchParams.delete('page');

      return {
        data: null,
        errorRedirect: searchParams.toString()
          ? `${MOVIES_PAGE_BASE_URL}?${searchParams.toString()}`
          : MOVIES_PAGE_BASE_URL,
      };
    }

    return { data: null, errorRedirect: MOVIES_PAGE_BASE_URL };
  }
};

export const getTVShows = async ({
  page,
  genres,
}: {
  page: number;
  genres: string | null;
}) => {
  try {
    const tvShows = await tmdb.discover.tvShow({
      page,
      ...(genres ? { with_genres: genres } : {}),
    });
    return { data: tvShows, errorRedirect: null };
  } catch (error) {
    const { status_code } = error as ErrorResponse;
    const searchParams = new URLSearchParams();

    if (status_code === 22) {
      if (page > TMDB_MAX_PAGE_AMOUNT)
        searchParams.set('page', String(TMDB_MAX_PAGE_AMOUNT));
      else searchParams.delete('page');

      return {
        data: null,
        errorRedirect: searchParams.toString()
          ? `${TV_SHOWS_PAGE_BASE_URL}?${searchParams.toString()}`
          : TV_SHOWS_PAGE_BASE_URL,
      };
    }

    return { data: null, errorRedirect: TV_SHOWS_PAGE_BASE_URL };
  }
};
