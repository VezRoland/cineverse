import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const newMinutes = minutes % 60;

  return `${hours} hour${hours > 1 ? 's' : ''} ${newMinutes} minute${
    newMinutes > 1 ? 's' : ''
  }`;
}
