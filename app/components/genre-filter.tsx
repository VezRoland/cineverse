import { useLocation, useNavigate } from "@remix-run/react"

import { Genre } from "tmdb-ts"

import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"

export const GenreFilter = ({ items }: { items: Genre[] }) => {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { genres } = Object.fromEntries(new URLSearchParams(search).entries())

  const currentGenres = genres?.split(",") || []

  const handleValueChange = (values: string[]) => {
    navigate(`${pathname}?genres=${values.join(",")}`)
  }

  return (
    <ToggleGroup
      className="flex flex-wrap justify-start"
      type="multiple"
      defaultValue={currentGenres}
      onValueChange={handleValueChange}
    >
      {items.map(item => (
        <ToggleGroupItem
          key={item.id}
          value={String(item.id)}
        >
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}