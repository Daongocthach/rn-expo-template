import { useTranslation } from 'react-i18next';
import { Modal, View } from 'react-native';
import { Loading } from '@/common/components/Loading';
import { Text } from '@/common/components/Text';
import { styles } from './BlockingLoadingModal.styles';
import type { BlockingLoadingModalProps } from './BlockingLoadingModal.types';

export function BlockingLoadingModal({
  visible,
  message,
  accessibilityLabel,
}: BlockingLoadingModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.backdrop} accessibilityRole="progressbar">
        <View style={styles.card}>
          <Loading
            message={message}
            accessibilityLabel={accessibilityLabel ?? message ?? t('common.loading')}
          />
          {message ? (
            <Text variant="bodySmall" style={styles.helperText}>
              {message}
            </Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}
