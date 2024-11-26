import { Icon } from '@iconify/react/dist/iconify.js';
import { Theme, useTheme } from 'remix-themes';

import { Button } from '~/components/ui/button';

export const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() =>
        setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
      }
    >
      {theme === Theme.LIGHT ? (
        <Icon icon="material-symbols:dark-mode-rounded" />
      ) : (
        <Icon icon="material-symbols:light-mode-rounded" />
      )}
    </Button>
  );
};
