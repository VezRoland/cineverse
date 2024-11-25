import { useLocation, useNavigate } from '@remix-run/react';

import { Genre } from 'tmdb-ts';

import {
  ToggleGroup,
  ToggleGroupItem,
} from '~/components/ui/toggle-group';

export const GenreFilter = ({ items }: { items: Genre[] }) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { genres } = Object.fromEntries(
    new URLSearchParams(search).entries()
  );

  const currentGenres = genres?.split(',');

  const handleValueChange = (values: string[]) => {
    const params = new URLSearchParams(search);
    params.delete('page');
    if (values.join().trim() !== '')
      params.set('genres', values.join(','));
    else params.delete('genres');

    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <ToggleGroup
      key={JSON.stringify(currentGenres)}
      className="flex flex-wrap justify-start"
      type="multiple"
      defaultValue={currentGenres}
      onValueChange={handleValueChange}
    >
      {items.map((item) => (
        <ToggleGroupItem key={item.id} value={String(item.id)}>
          {item.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
