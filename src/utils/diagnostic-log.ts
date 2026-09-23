import { Platform } from 'react-native';
import { APP_NAME, VERSION, RUNTIME_VERSION, getApiBaseUrl } from '@/utils';

type DiagnosticApiError = {
  status?: number;
  code?: string | number;
  message?: string;
  url?: string;
  method?: string;
  responseData?: unknown;
};

export type DiagnosticMeta = {
  id?: string;
  timestamp?: number;
};

export type DiagnosticLogDetail = {
  appName: string;
  appVersion: string;
  buildVersion: string;
  platform: string;
  level: string;
  source: string;
  message: string;
  route?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  payload?: Record<string, unknown>;
  response?: Record<string, unknown>;
  meta?: DiagnosticMeta;
};

export type DiagnosticLogOptions = {
  appName?: string;
  source?: string;
  platform?: string;
};

export const isEnableDiagnosticLog = (): boolean => {
  return __DEV__;
};

const getMobileErrorLogEndpoint = () => `${getApiBaseUrl()}/api/v1/mobile_error_logs/`;
const MOBILE_ERROR_LOG_TIMEOUT_MS = 5000;

const SENSITIVE_KEYS = new Set([
  'password',
  'refresh_token',
  'access_token',
  'token',
  'authorization',
]);

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const redactObject = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(redactObject);
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const result: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    const lowerKey = key.toLowerCase();

    if (SENSITIVE_KEYS.has(lowerKey)) {
      result[key] = '[redacted]';
      continue;
    }

    if (lowerKey === 'image' || lowerKey.includes('file')) {
      result[key] = '[file]';
      continue;
    }

    result[key] = redactObject(item);
  }

  return result;
};

const normalizeValue = (value: unknown): Record<string, unknown> => {
  if (value === undefined || value === null) {
    return {};
  }

  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      const normalized = redactObject(parsed);
      return isPlainObject(normalized) ? normalized : { value: normalized };
    } catch {
      return { raw: value };
    }
  }

  if (Array.isArray(value)) {
    return { items: redactObject(value) as unknown[] };
  }

  if (isPlainObject(value)) {
    const normalized = redactObject(value);
    return isPlainObject(normalized) ? normalized : { value: normalized };
  }

  return { value: String(value) };
};

export const buildDiagnosticLogDetail = (
  error: unknown,
  apiError: DiagnosticApiError,
  options: DiagnosticLogOptions = {}
): DiagnosticLogDetail => {
  const request = error as {
    config?: { data?: unknown; params?: unknown; method?: string; url?: string };
  };
  const method = String(apiError.method ?? request?.config?.method ?? 'unknown').toUpperCase();
  const isGetRequest = method === 'GET';
  const requestData = isGetRequest
    ? request?.config?.params
    : (request?.config?.data ?? request?.config?.params);
  const payload = normalizeValue(requestData);
  const response = normalizeValue(apiError.responseData ?? { message: apiError.message });
  const now = Date.now();

  return {
    appName: options.appName ?? APP_NAME,
    appVersion: VERSION.replace(/^v/i, ''),
    buildVersion: RUNTIME_VERSION,
    platform: options.platform ?? Platform.OS,
    level: 'error',
    source: options.source ?? 'api',
    message: apiError.message || 'Unknown error',
    route: apiError.url ?? request?.config?.url ?? 'unknown',
    method,
    url: apiError.url ?? request?.config?.url ?? 'unknown',
    statusCode: apiError.status ?? undefined,
    payload,
    response,
    meta: {
      id: `${now}-${Math.random().toString(36).slice(2, 10)}`,
      timestamp: now,
    },
  };
};

export const shouldSkipDiagnosticLog = (url: string | undefined) => {
  if (!url) return false;
  return url.includes('mobile_error_logs/');
};

export async function sendMobileErrorLog(
  error: unknown,
  apiError: DiagnosticApiError
): Promise<void> {
  if (!isEnableDiagnosticLog()) {
    return;
  }

  const requestUrl = apiError.url ?? (error as { config?: { url?: string } })?.config?.url;
  if (shouldSkipDiagnosticLog(String(requestUrl ?? ''))) {
    return;
  }

  const detail = buildDiagnosticLogDetail(error, apiError, {
    source: 'api',
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MOBILE_ERROR_LOG_TIMEOUT_MS);

  try {
    const response = await fetch(getMobileErrorLogEndpoint(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error_detail: detail }),
      signal: controller.signal,
    });

    if (!response.ok && __DEV__) {
      console.warn('Failed to send mobile error log:', response.status, response.statusText);
    }
  } catch (logError) {
    if (__DEV__) {
      console.warn('Failed to send mobile error log:', logError);
    }
  } finally {
    clearTimeout(timeout);
  }
}
