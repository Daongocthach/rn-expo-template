import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { env } from '@/config/env';
import { useAuthStore } from '@/providers/auth/authStore';
import { getApiBaseUrl } from '@/utils';

export class ApiError extends Error {
  status?: number;
  code?: string | number;

  constructor(message: string, status?: number, code?: string | number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  code?: string | number;
  data?: {
    code?: string | number;
    message?: string;
  };
}

interface JwtPayload {
  exp?: number;
}

const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicAxios = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshSessionPromise: Promise<void> | null = null;

function applyRuntimeBaseUrl(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  config.baseURL = getApiBaseUrl();
  return config;
}

function isAccessTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return typeof decoded.exp === 'number' && decoded.exp <= Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

async function refreshAuthSession(): Promise<void> {
  const session = useAuthStore.getState().session;
  const accessToken = session?.access_token?.trim();
  const refreshToken = session?.refresh_token?.trim();

  if (!refreshToken || !accessToken || !isAccessTokenExpired(accessToken)) {
    return;
  }

  if (refreshSessionPromise) {
    await refreshSessionPromise;
    return;
  }

  refreshSessionPromise = (async () => {
    const { refreshToken: refreshAuthToken } =
      await import('@/features/auth/services/auth.service');
    const result = await refreshAuthToken(refreshToken);
    useAuthStore.getState().hydrateAuth(result);
  })();

  try {
    await refreshSessionPromise;
  } catch (error) {
    useAuthStore.getState().clearSession();
    throw error;
  } finally {
    refreshSessionPromise = null;
  }
}

async function applyRuntimeAuthHeader(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  await refreshAuthSession();

  const token = useAuthStore.getState().session?.access_token?.trim();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

async function handleApiError(error: AxiosError<ApiErrorResponse>): Promise<never> {
  if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
    return Promise.reject(error);
  }

  if (__DEV__) {
    const method = error.config?.method?.toUpperCase() ?? 'UNKNOWN';
    const url = error.config?.url ?? 'UNKNOWN_URL';
    const status = error.response?.status ?? 'NO_RESPONSE';
    const responseBody = error.response?.data ?? null;

    console.error(`[API] ${method} ${url}`, {
      status,
      message: error.message,
      responseBody,
      params: error.config?.params,
    });
  }

  const status = error.response?.status;
  const code = error.response?.data?.code || error.response?.data?.data?.code;

  const message =
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'An unexpected error occurred';

  return Promise.reject(new ApiError(message, status, code));
}

api.interceptors.request.use(applyRuntimeBaseUrl);
api.interceptors.request.use(applyRuntimeAuthHeader);
publicAxios.interceptors.request.use(applyRuntimeBaseUrl);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().clearSession();
    }

    return handleApiError(error);
  }
);

publicAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => handleApiError(error)
);

const axiosClient = api;

export { api, axiosClient, publicAxios };
