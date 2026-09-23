import { isValid } from 'date-fns';

export function parseDateOrFallback(value: string | null | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const parsedDate = new Date(`${value}T00:00:00`);
  return isValid(parsedDate) ? parsedDate : undefined;
}
