import { useLocation, Link } from '@remix-run/react';
import {
  TMDB_MIN_PAGE_AMOUNT,
  TMDB_MAX_PAGE_AMOUNT,
} from '~/lib/tmdb.config';

import { Icon } from '@iconify/react';
import {
  Pagination,
  PaginationContent,
  PaginationLink,
} from './ui/pagination';

function getPaginationRange(currentPage: number, totalPages: number) {
  const maxButtons = 5;
  const halfRange = Math.floor(maxButtons / 2);

  let startPage: number;
  let endPage: number;

  if (totalPages <= maxButtons) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= halfRange + 1) {
    startPage = 1;
    endPage = maxButtons;
  } else if (currentPage + halfRange >= totalPages) {
    startPage = totalPages - maxButtons + 1;
    endPage = totalPages;
  } else {
    startPage = currentPage - halfRange;
    endPage = currentPage + halfRange;
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
}

function getPageUrl(url: string, paramString: string, page: number) {
  const params = new URLSearchParams(paramString);
  params.set('page', String(page));

  return `${url}?${params.toString()}`;
}

export const Paginator = ({ totalPages }: { totalPages: number }) => {
  const { pathname, search } = useLocation();
  const { page } = Object.fromEntries(
    new URLSearchParams(search).entries()
  );

  const currentPage = parseInt(page) || TMDB_MIN_PAGE_AMOUNT;
  const pages = getPaginationRange(
    currentPage,
    Math.min(totalPages, TMDB_MAX_PAGE_AMOUNT)
  );

  return (
    <footer>
      <Pagination>
        {currentPage > TMDB_MIN_PAGE_AMOUNT && (
          <Link
            to={getPageUrl(
              pathname,
              search,
              Math.max(currentPage - 1, TMDB_MIN_PAGE_AMOUNT)
            )}
          >
            <PaginationLink>
              <Icon icon="material-symbols:arrow-back-rounded" />
            </PaginationLink>
          </Link>
        )}
        <PaginationContent>
          {pages.map((page) => (
            <Link key={page} to={getPageUrl(pathname, search, page)}>
              <PaginationLink isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </Link>
          ))}
          {currentPage <
            Math.min(totalPages, TMDB_MAX_PAGE_AMOUNT) && (
            <Link
              to={getPageUrl(
                pathname,
                search,
                Math.min(
                  currentPage + 1,
                  Math.min(totalPages, TMDB_MAX_PAGE_AMOUNT)
                )
              )}
            >
              <PaginationLink>
                <Icon icon="material-symbols:arrow-forward-rounded" />
              </PaginationLink>
            </Link>
          )}
        </PaginationContent>
      </Pagination>
    </footer>
  );
};
