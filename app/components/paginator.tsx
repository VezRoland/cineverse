import { useLocation, Link } from "@remix-run/react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationLink } from "./ui/pagination"

function getPaginationRange(currentPage: number, totalPages: number) {
  const maxButtons = 5
  const halfRange = Math.floor(maxButtons / 2)

  let startPage: number
  let endPage: number

  if (totalPages <= maxButtons) {
    startPage = 1
    endPage = totalPages
  } else if (currentPage <= halfRange + 1) {
    startPage = 1
    endPage = maxButtons
  } else if (currentPage + halfRange >= totalPages) {
    startPage = totalPages - maxButtons + 1
    endPage = totalPages
  } else {
    startPage = currentPage - halfRange
    endPage = currentPage + halfRange
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
}

function getPageUrl(url: string, paramString: string, page: number) {
  const params = new URLSearchParams(paramString)
  params.set("page", String(page))

  return `${url}?${params.toString()}`
}

export const Paginator = ({ totalPages }: { totalPages: number }) => {
  const { pathname, search } = useLocation()
  const { page } = Object.fromEntries(new URLSearchParams(search).entries())

  const currentPage = parseInt(page || "1")
  const pages = getPaginationRange(currentPage, totalPages)

  return (
    <footer>
      <Pagination>
        {
          currentPage > 1 &&
          <Link to={getPageUrl(pathname, search, 1)}>
            <PaginationLink>
              <PaginationEllipsis />
            </PaginationLink>
          </Link>
        }
        <PaginationContent>
          {pages.map(page => (
            <Link
              key={page}
              to={getPageUrl(pathname, search, page)}
            >
              <PaginationLink isActive={currentPage === page}>
                  {page}
              </PaginationLink>
            </Link>
          ))}
          {
            currentPage < totalPages &&
            <Link to={getPageUrl(pathname, search, totalPages)}>
              <PaginationLink>
                <PaginationEllipsis />
              </PaginationLink>
            </Link>
          }
        </PaginationContent>
      </Pagination>
    </footer>
  )
}