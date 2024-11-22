import { Link, useLocation } from "@remix-run/react"
import { Button } from "./ui/button"
import { Logo } from "./logo"

const pages = [
  { name: "Home", path: "/" },
  { name: "Trending", path: "/trending" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/series" },
]

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 max-w-full flex px-8 py-4 border-b border-muted bg-background">
      <div className="w-1/4">
        <Logo />
      </div>
      <ul className="flex flex-1 justify-center gap-4">
        {pages.map(page => (
          <li key={page.name}>
            <Button
              asChild
              variant="ghost"
              className={pathname === page.path ? "text-primary hover:text-primary-foreground hover:bg-primary" : ""}
            >              
              <Link to={page.path}>
                {page.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
      <div className="w-1/4">

      </div>
    </nav>
  )
}