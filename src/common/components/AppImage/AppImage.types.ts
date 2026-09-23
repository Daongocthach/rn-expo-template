import type { ImageContentFit, ImageProps as ExpoImageProps } from 'expo-image';
import type { StyleProp, ImageStyle } from 'react-native';

export type AppImageMode = 'default' | 'zoom';

export interface AppImageProps extends Omit<
  ExpoImageProps,
  'source' | 'style' | 'contentFit' | 'accessibilityLabel'
> {
  source: NonNullable<ExpoImageProps['source']>;
  mode?: AppImageMode;
  contentFit?: ImageContentFit;
  style?: StyleProp<ImageStyle>;
  accessibilityLabel?: string;
  zoomSwipeDownToClose?: boolean;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center' | 'repeat';
}
