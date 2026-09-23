import { Modal, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardStickyView } from 'react-native-keyboard-controller';
import { Button } from '@/common/components/Button';
import { Text } from '@/common/components/Text';
import { styles } from './Dialog.styles';
import type { DialogProps } from './Dialog.types';

/**
 * A modal dialog overlay for confirmations, alerts, or custom content.
 *
 * @example
 * ```tsx
 * <Dialog
 *   visible={isOpen}
 *   onDismiss={() => setIsOpen(false)}
 *   title="Confirm"
 *   message="Are you sure?"
 *   actions={[{ label: 'OK', onPress: handleConfirm }]}
 * />
 * ```
 */
export function Dialog({
  visible,
  onDismiss,
  title,
  message,
  actions = [],
  children,
  size = 'md',
  dismissOnBackdropPress = true,
  keyboardAware = false,
}: DialogProps) {
  styles.useVariants({ size });
  const renderDialogBody = () => (
    <>
      {title && (
        <Text variant="h3" style={styles.title}>
          {title}
        </Text>
      )}
      {message && (
        <Text variant="body" style={styles.message}>
          {message}
        </Text>
      )}
      {children}
    </>
  );

  const renderActions = () =>
    actions.length > 0 ? (
      <View style={styles.actions}>
        {actions.map((action) => (
          <Button
            key={action.label}
            title={action.label}
            variant={action.variant ?? 'ghost'}
            size="sm"
            onPress={action.onPress}
            loading={action.loading}
            disabled={action.disabled}
          />
        ))}
      </View>
    ) : null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={dismissOnBackdropPress ? onDismiss : undefined}>
        <Pressable
          style={[styles.card, keyboardAware ? styles.keyboardAwareCard : undefined]}
          onPress={() => {}}
        >
          {keyboardAware ? (
            <>
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {renderDialogBody()}
              </KeyboardAwareScrollView>
              <KeyboardStickyView offset={{ closed: 0, opened: 0 }} style={styles.footer}>
                {renderActions()}
              </KeyboardStickyView>
            </>
          ) : (
            <>
              {renderDialogBody()}
              {renderActions()}
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
