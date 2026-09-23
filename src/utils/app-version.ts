export const VERSION = '1.0.0';
export const OTA_VERSION = 1;
export const APP_NAME = 'Expo Starter';
export const APP_SLUG = 'rn-expo-template';
export const RUNTIME_VERSION = `${APP_SLUG}-v${VERSION}`;

export function isVersionGreater(latestVersion: string, currentVersion: string): boolean {
  const latestParts = latestVersion.trim().replace(/^v/i, '').split('.').map(Number);
  const currentParts = currentVersion.trim().replace(/^v/i, '').split('.').map(Number);

  const maxLength = Math.max(latestParts.length, currentParts.length);

  for (let index = 0; index < maxLength; index += 1) {
    const latestPart = latestParts[index] ?? 0;
    const currentPart = currentParts[index] ?? 0;

    if (latestPart > currentPart) {
      return true;
    }

    if (latestPart < currentPart) {
      return false;
    }
  }

  return false;
}
