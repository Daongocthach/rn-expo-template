import { Image as ExpoImage } from 'expo-image';
import type { ImageContentFit } from 'expo-image';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View, Image as RNImage, StyleSheet as RNStyleSheet } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaModal } from '@/common/components/SafeAreaModal';
import { styles } from './AppImage.styles';
import type { AppImageProps } from './AppImage.types';

function resolveZoomUri(source: AppImageProps['source']): string | null {
  if (typeof source === 'string') {
    return source;
  }

  if (typeof source === 'number') {
    return RNImage.resolveAssetSource(source)?.uri ?? null;
  }

  if (Array.isArray(source)) {
    const first = source[0];
    return first ? resolveZoomUri(first) : null;
  }

  if (source && typeof source === 'object' && 'uri' in source) {
    const uri = source.uri;
    return typeof uri === 'string' ? uri : null;
  }

  return null;
}

export function AppImage({
  source,
  mode = 'default',
  contentFit = 'cover',
  resizeMode,
  style,
  accessibilityLabel,
  zoomSwipeDownToClose = true,
  ...rest
}: AppImageProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [isZoomVisible, setIsZoomVisible] = useState(false);
  const zoomUri = useMemo(() => resolveZoomUri(source), [source]);

  let resolvedContentFit: ImageContentFit = contentFit;

  if (resizeMode === 'stretch') {
    resolvedContentFit = 'fill';
  } else if (resizeMode === 'center') {
    resolvedContentFit = 'none';
  } else if (resizeMode === 'repeat') {
    resolvedContentFit = 'cover';
  } else if (resizeMode) {
    resolvedContentFit = resizeMode;
  }

  const imageNode = (
    <ExpoImage
      source={source}
      style={style}
      contentFit={resolvedContentFit}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      {...rest}
    />
  );

  if (mode !== 'zoom' || !zoomUri) {
    return imageNode;
  }

  const handleOpenZoom = () => {
    setIsZoomVisible(true);
  };

  const handleCloseZoom = () => {
    setIsZoomVisible(false);
  };

  return (
    <>
      <Pressable
        onPress={handleOpenZoom}
        style={[style, styles.zoomTrigger]}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? t('common.confirm')}
      >
        <ExpoImage
          source={source}
          style={[RNStyleSheet.absoluteFill, styles.zoomTriggerImage]}
          contentFit={resolvedContentFit}
          accessibilityRole="image"
          accessibilityLabel={accessibilityLabel}
          {...rest}
        />
      </Pressable>

      <SafeAreaModal
        visible={isZoomVisible}
        onDismiss={handleCloseZoom}
        dismissOnBackdropPress
        closeAccessibilityLabel={t('common.close')}
        backdropStyle={styles.zoomModalBackdrop}
        cardStyle={styles.zoomModalCard}
        contentStyle={styles.zoomModalContent}
        headerStyle={[styles.zoomModalHeader, { paddingTop: Math.max(insets.top, 24) + 12 }]}
      >
        <View style={styles.zoomModal}>
          <ImageViewer
            imageUrls={[{ url: zoomUri }]}
            index={0}
            enableImageZoom
            enableSwipeDown={zoomSwipeDownToClose}
            onSwipeDown={handleCloseZoom}
            onCancel={handleCloseZoom}
            saveToLocalByLongPress={false}
            backgroundColor="#000000"
            style={styles.zoomViewer}
          />
        </View>
      </SafeAreaModal>
    </>
  );
}
