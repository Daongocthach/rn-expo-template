import { z } from 'zod/v4';
import { env } from '@/config/env';
import { getItem, removeItem, setItem, STORAGE_KEYS } from '@/utils/storage';
import type { StorageResult } from '@/utils/storage/types';

export function getSingleParam(param: string | string[] | undefined): string | undefined {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
}

export function cleanParams(
  params: Record<string, unknown>
): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value as string | number | boolean;
    }
  }
  return cleaned;
}

export function resolveTokenColor(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

const defaultApiBaseUrl = normalizeUrl(env.apiBaseUrl);
const apiBaseUrlSchema = z.string().trim().url();

function normalizeUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

export function normalizeApiBaseUrl(value: string): string {
  return normalizeUrl(value);
}

export function getDefaultApiBaseUrl(): string {
  return defaultApiBaseUrl;
}

export function getApiBaseUrl(): string {
  const stored = getItem<string>(STORAGE_KEYS.preferences.apiBaseUrl);

  if (!stored.success || !stored.data) {
    return defaultApiBaseUrl;
  }

  const normalized = normalizeApiBaseUrl(stored.data);
  return apiBaseUrlSchema.safeParse(normalized).success ? normalized : defaultApiBaseUrl;
}

export function setApiBaseUrl(url: string): StorageResult<string> {
  const normalized = normalizeApiBaseUrl(url);
  const parsed = apiBaseUrlSchema.safeParse(normalized);

  if (!parsed.success) {
    return {
      success: false,
      error: new Error('Invalid URL format'),
    };
  }

  return setItem(STORAGE_KEYS.preferences.apiBaseUrl, normalized);
}

export function resetApiBaseUrl(): StorageResult<void> {
  return removeItem(STORAGE_KEYS.preferences.apiBaseUrl);
}

export function isCustomApiBaseUrl(): boolean {
  const stored = getItem<string>(STORAGE_KEYS.preferences.apiBaseUrl);

  if (!stored.success || !stored.data) {
    return false;
  }

  const normalized = normalizeApiBaseUrl(stored.data);
  return apiBaseUrlSchema.safeParse(normalized).success && normalized !== defaultApiBaseUrl;
}

function isPrivateIpv4Host(hostname: string): boolean {
  const octets = hostname.split('.').map(Number);

  if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet))) {
    return false;
  }

  const [first, second] = octets;
  return (
    first === 10 ||
    first === 127 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

export function isLocalApiUrl(): boolean {
  const currentUrl = getApiBaseUrl();

  try {
    const hostname = new URL(currentUrl).hostname.toLowerCase().replace(/^\[|\]$/g, '');
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.local') ||
      isPrivateIpv4Host(hostname)
    );
  } catch {
    return false;
  }
}

export function normalizeImageUrl(image?: string | null): string | undefined {
  const normalized = image?.trim();
  if (!normalized) return undefined;

  if (
    normalized.startsWith('http://') ||
    normalized.startsWith('https://') ||
    normalized.startsWith('file://') ||
    normalized.startsWith('content://') ||
    normalized.startsWith('data:') ||
    normalized.startsWith('blob:')
  ) {
    return normalized;
  }

  const baseUrl = getApiBaseUrl().replace(/\/+$/, '');
  const path = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return `${baseUrl}${path}`;
}

export function resolveApiImage(
  publicImage?: string | null,
  localImage?: string | null
): string | undefined {
  const [primaryImage, fallbackImage] = isLocalApiUrl()
    ? [localImage, publicImage]
    : [publicImage, localImage];

  return normalizeImageUrl(primaryImage) ?? normalizeImageUrl(fallbackImage);
}

export function resolveApiImages(
  publicImages?: readonly (string | null | undefined)[] | null,
  localImages?: readonly (string | null | undefined)[] | null
): string[] {
  const [primaryImages, fallbackImages] = isLocalApiUrl()
    ? [localImages, publicImages]
    : [publicImages, localImages];
  const normalizedPrimaryImages = (primaryImages ?? []).flatMap((image) => {
    const normalized = normalizeImageUrl(image);
    return normalized ? [normalized] : [];
  });

  if (normalizedPrimaryImages.length > 0) {
    return normalizedPrimaryImages;
  }

  return (fallbackImages ?? []).flatMap((image) => {
    const normalized = normalizeImageUrl(image);
    return normalized ? [normalized] : [];
  });
}

/** Normalizes a string for search comparison by removing diacritics / accents. */
export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .trim();
}

/** Checks if a text matches a query with diacritic insensitivity and multi-keyword support. */
export function matchesSearch(text: string, query: string): boolean {
  const normQuery = normalizeSearchText(query);
  if (!normQuery) return true;
  const normText = normalizeSearchText(text);
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);
  return queryTokens.every((token) => normText.includes(token));
}
