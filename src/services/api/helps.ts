import type { AxiosError } from 'axios';

type ApiErrorResponse = {
  code?: string | number;
  message?: string;
  data?: {
    code?: string | number;
    message?: string;
  };
};

const getErrorMessage = (error: AxiosError<ApiErrorResponse>) =>
  error.response?.data?.message ||
  error.response?.data?.data?.message ||
  error.message ||
  'Unknown error';

const getErrorCode = (error: AxiosError<ApiErrorResponse>) =>
  error.response?.data?.code || error.response?.data?.data?.code || error.response?.status;

export const formatApiError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  return {
    status: axiosError.response?.status,
    code: getErrorCode(axiosError),
    message: getErrorMessage(axiosError),
    url: axiosError.config?.url,
    method: axiosError.config?.method,
    responseData: axiosError.response?.data,
  };
};

export const formatApiErrorDisplayMessage = (error: unknown) => {
  const { code, message } = formatApiError(error);
  return code ? `(${code}) ${message}` : message;
};
