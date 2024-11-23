import { Button } from "./ui/button"

export const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-center items-center px-8 py-4 border-t border-border">
      <div className="flex-1"></div>
      <p>Made by Roland Vezsenyi</p>
      <ul className="flex justify-end flex-1">
        <li>
          <Button
            variant="link"
            asChild
          >
            <a href="https://www.themoviedb.org/">The Movie Database</a>
          </Button>
        </li>
        <li>
          <Button
            variant="link"
            asChild
          >
            <a href="https://logoipsum.com/">Logoipsum</a>
          </Button>
        </li>
      </ul>
    </footer>
  )
}