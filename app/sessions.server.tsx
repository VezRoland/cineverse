import "dotenv/config"
import { createCookieSessionStorage } from '@remix-run/node';
import { createThemeSessionResolver } from 'remix-themes';

const isProduction = process.env.NODE_ENV === 'production';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: isProduction
  },
});

export const themeSessionResolver =
  createThemeSessionResolver(sessionStorage);
