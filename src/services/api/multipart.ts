import type { AxiosInstance } from 'axios';

export type MultipartPayload = FormData | Record<string, string | number | boolean | Blob | null>;

export function sendMultipartRequest<TResponse>(
  client: AxiosInstance,
  method: 'post' | 'put' | 'patch',
  url: string,
  payload: MultipartPayload
) {
  return client.request<TResponse>({
    method,
    url,
    data: payload,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
