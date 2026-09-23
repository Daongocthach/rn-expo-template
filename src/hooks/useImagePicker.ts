import * as ImagePicker from 'expo-image-picker';
import { useCallback } from 'react';

export interface PickedImage {
  uri: string;
  assetId: string | null;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  width: number;
  height: number;
  base64: string | null;
  type: 'image' | 'video' | 'livePhoto' | 'pairedVideo' | null | undefined;
  asset: ImagePicker.ImagePickerAsset;
}

export interface UseImagePickerReturn {
  pickImage: (options?: ImagePicker.ImagePickerOptions) => Promise<PickedImage | null>;
  requestPermission: (writeOnly?: boolean) => Promise<ImagePicker.MediaLibraryPermissionResponse>;
}

function normalizeAsset(asset: ImagePicker.ImagePickerAsset): PickedImage {
  return {
    uri: asset.uri,
    assetId: asset.assetId ?? null,
    fileName: asset.fileName ?? null,
    fileSize: asset.fileSize ?? null,
    mimeType: asset.mimeType ?? null,
    width: asset.width,
    height: asset.height,
    base64: asset.base64 ?? null,
    type: asset.type,
    asset,
  };
}

export function useImagePicker(): UseImagePickerReturn {
  const requestPermission = useCallback(async (writeOnly = false) => {
    const currentPermission = await ImagePicker.getMediaLibraryPermissionsAsync(writeOnly);

    if (currentPermission.granted || !currentPermission.canAskAgain) {
      return currentPermission;
    }

    return ImagePicker.requestMediaLibraryPermissionsAsync(writeOnly);
  }, []);

  const pickImage = useCallback(
    async (options: ImagePicker.ImagePickerOptions = {}) => {
      const permission = await requestPermission(false);

      if (!permission.granted) {
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        ...options,
      });

      if (result.canceled || !result.assets?.length) {
        return null;
      }

      return normalizeAsset(result.assets[0]);
    },
    [requestPermission]
  );

  return {
    pickImage,
    requestPermission,
  };
}
