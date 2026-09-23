import type {
  AuthResult,
  AuthUser,
  LoginApiData,
  LoginProps,
  RegisterProps,
} from '@/features/auth/types';
import { useAuthStore } from '@/providers/auth/authStore';
import { api, publicAxios } from '@/services/api';
import type { ApiResponse } from '@/types/api';

export async function login(data: LoginProps) {
  const { data: response } = await api.post<ApiResponse<LoginApiData>>('/api/v1/auth/login/', data);

  if (!response.status) {
    throw new Error(response.message || 'Login failed');
  }

  return toAuthResult(response.data);
}

export async function logout() {
  const { data } = await api.post<ApiResponse<unknown>>('/api/v1/auth/logout/');
  return data;
}

export async function logoutAndClearSession() {
  try {
    await logout();
  } finally {
    useAuthStore.getState().clearSession();
  }
}

const AUTH_ENDPOINT = '/api/v1/auth/';

export async function refreshToken(refreshTokenValue: string) {
  const { data: response } = await publicAxios.post<ApiResponse<LoginApiData>>(
    `${AUTH_ENDPOINT}refresh/`,
    { refresh_token: refreshTokenValue }
  );

  if (!response.status) {
    throw new Error(response.message || 'Token refresh failed');
  }

  return toAuthResult(response.data);
}

function toAuthResult(response: LoginApiData): AuthResult {
  if ('user' in response && 'session' in response) {
    return response as unknown as AuthResult;
  }

  const { access_token, refresh_token, ...user } = response;
  return {
    user: user as AuthUser,
    session: { access_token, refresh_token },
  };
}

export async function register(data: RegisterProps) {
  const { data: res } = await api.post<ApiResponse<AuthUser>>('/api/v1/auth/register/', data);
  return res.data;
}
