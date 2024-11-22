import { Link, useLocation } from "@remix-run/react"
import { Button } from "./ui/button"
import { Logo } from "./logo"
import { Icon } from "@iconify/react"

const pages = [
  { name: "Home", icon: <Icon icon="material-symbols:home-rounded" />, path: "/" },
  { name: "Trending", icon: <Icon icon="material-symbols:trending-up-rounded" />, path: "/trending" },
  { name: "Movies", icon: <Icon icon="material-symbols:movie-rounded" />, path: "/movies" },
  { name: "TV Shows", icon: <Icon icon="material-symbols:tv-gen-rounded" />, path: "/tv-shows" },
]

export const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="sticky top-0 max-w-full flex px-8 py-4 border-b border-border bg-background">
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
                {page.icon}
                {page.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
      <div className="w-1/4"></div>
    </nav>
  )
}