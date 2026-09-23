import * as DocumentPicker from 'expo-document-picker';
import { useCallback, useState } from 'react';
import type { FileProps } from '@/types';

export interface UseDocumentPickerOptions {
  type?: string | string[];
  multiple?: boolean;
  copyToCacheDirectory?: boolean;
}

export interface UseDocumentPickerReturn {
  pickDocument: (overrideOptions?: UseDocumentPickerOptions) => Promise<FileProps[] | null>;
  isPicking: boolean;
}

const DEFAULT_OPTIONS: Required<
  Pick<UseDocumentPickerOptions, 'copyToCacheDirectory' | 'multiple'>
> = {
  copyToCacheDirectory: true,
  multiple: false,
};

function getFileType(asset: DocumentPicker.DocumentPickerAsset) {
  return asset.mimeType ?? 'application/octet-stream';
}

function normalizeAsset(asset: DocumentPicker.DocumentPickerAsset): FileProps {
  return {
    uri: asset.uri,
    name: asset.name || `file_${Date.now()}`,
    type: getFileType(asset),
  };
}

export function useDocumentPicker(options?: UseDocumentPickerOptions): UseDocumentPickerReturn {
  const [isPicking, setIsPicking] = useState(false);

  const pickDocument = useCallback(
    async (overrideOptions?: UseDocumentPickerOptions): Promise<FileProps[] | null> => {
      try {
        setIsPicking(true);

        const result = await DocumentPicker.getDocumentAsync({
          type: overrideOptions?.type ?? options?.type ?? '*/*',
          multiple: overrideOptions?.multiple ?? options?.multiple ?? DEFAULT_OPTIONS.multiple,
          copyToCacheDirectory:
            overrideOptions?.copyToCacheDirectory ??
            options?.copyToCacheDirectory ??
            DEFAULT_OPTIONS.copyToCacheDirectory,
          base64: false,
        });

        if (result.canceled) {
          return null;
        }

        return result.assets.map(normalizeAsset);
      } catch (error) {
        console.error('Document picker error:', error);
        return null;
      } finally {
        setIsPicking(false);
      }
    },
    [options]
  );

  return {
    pickDocument,
    isPicking,
  };
}
