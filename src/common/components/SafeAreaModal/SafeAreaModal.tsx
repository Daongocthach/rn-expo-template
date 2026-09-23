import { X } from 'lucide-react-native';
import { Modal, Pressable, View } from 'react-native';
import { IconButton } from '@/common/components/IconButton';
import { Text } from '@/common/components/Text';
import { styles } from './SafeAreaModal.styles';
import type { SafeAreaModalProps } from './SafeAreaModal.types';

export function SafeAreaModal({
  visible,
  onDismiss,
  children,
  title,
  dismissOnBackdropPress = true,
  showCloseButton = true,
  backdropStyle,
  cardStyle,
  headerStyle,
  contentStyle,
  closeAccessibilityLabel = 'Close',
}: SafeAreaModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Pressable
        style={[styles.backdrop, backdropStyle]}
        onPress={dismissOnBackdropPress ? onDismiss : undefined}
      >
        <Pressable style={[styles.card, cardStyle]} onPress={() => {}}>
          {title || showCloseButton ? (
            <View style={[styles.header, headerStyle]}>
              {title ? (
                <Text variant="h3" style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
              ) : (
                <View style={styles.headerSpacer} />
              )}
              {showCloseButton ? (
                <IconButton
                  icon={X}
                  variant="secondary"
                  size="md"
                  onPress={onDismiss}
                  accessibilityLabel={closeAccessibilityLabel}
                />
              ) : null}
            </View>
          ) : null}

          <View style={[styles.content, contentStyle]}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
