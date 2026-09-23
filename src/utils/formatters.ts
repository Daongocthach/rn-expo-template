import { format, isValid, parseISO } from 'date-fns';

interface FormatTemperatureOptions {
  missingValue?: string;
  separator?: string;
  unit?: string;
}

interface FormatDateTimeOptions {
  missingValue?: string;
  pattern?: string;
}

export function formatTemperature(
  value: number | null | undefined,
  options: FormatTemperatureOptions = {}
): string {
  const { missingValue = '--', separator = '', unit = '°C' } = options;

  if (typeof value !== 'number' || Number.isNaN(value)) {
    return missingValue;
  }

  return `${value}${separator}${unit}`;
}

export function formatDateTime(
  value: string | null | undefined,
  options: FormatDateTimeOptions = {}
): string {
  const { missingValue = '--', pattern = 'yyyy-MM-dd HH:mm:ss' } = options;

  if (!value) {
    return missingValue;
  }

  const parsedDate = parseISO(value);
  if (!isValid(parsedDate)) {
    return missingValue;
  }

  return format(parsedDate, pattern);
}

export function formatDate(
  value: string | null | undefined,
  options: FormatDateTimeOptions = {}
): string {
  const { missingValue = '--' } = options;

  return formatDateTime(value, {
    missingValue,
    pattern: 'yyyy-MM-dd',
  });
}

export function formatCurrency(value: number | null | undefined): string {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '0 ₫';
  }

  return `${value.toLocaleString('vi-VN')} ₫`;
}
