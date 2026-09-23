import { describe, expect, it } from '@jest/globals';
import { resolveApiImage, resolveApiImages, getApiBaseUrl } from './helpers';

describe('helpers: resolveApiImage and resolveApiImages', () => {
  it('resolves relative URLs by prefixing with the active API base URL', () => {
    const relativePath = '/media/maintenance_files/file_example_XLS_10_oskc75P.xls';
    const resolved = resolveApiImage(relativePath);
    const expectedBase = getApiBaseUrl().replace(/\/+$/, '');
    expect(resolved).toBe(`${expectedBase}${relativePath}`);
  });

  it('keeps absolute HTTP/HTTPS URLs as-is', () => {
    const httpUrl = 'http://example.com/media/file.xls';
    const httpsUrl = 'https://example.com/image.png';
    expect(resolveApiImage(httpUrl)).toBe(httpUrl);
    expect(resolveApiImage(httpsUrl)).toBe(httpsUrl);
  });

  it('returns undefined when image input is null or empty', () => {
    expect(resolveApiImage(null)).toBeUndefined();
    expect(resolveApiImage(undefined)).toBeUndefined();
    expect(resolveApiImage('')).toBeUndefined();
  });

  it('resolves arrays of image paths correctly with resolveApiImages', () => {
    const list = [
      '/media/img1.jpg',
      'https://cdn.example.com/img2.jpg',
      '',
      null,
      '/media/img3.png',
    ];
    const resolved = resolveApiImages(list);
    const expectedBase = getApiBaseUrl().replace(/\/+$/, '');
    expect(resolved).toEqual([
      `${expectedBase}/media/img1.jpg`,
      'https://cdn.example.com/img2.jpg',
      `${expectedBase}/media/img3.png`,
    ]);
  });
});
