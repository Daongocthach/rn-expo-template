import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '@/common/components/Text';
import {
  appAlert,
  registerAppAlertHandler,
  type AppAlertButton,
  type AppAlertPayload,
} from './appAlert';

interface AppAlertProviderProps {
  children: ReactNode;
}

function isDestructive(button: AppAlertButton) {
  return button.style === 'destructive';
}

export function AppAlertProvider({ children }: AppAlertProviderProps) {
  const { t } = useTranslation();
  const [currentAlert, setCurrentAlert] = useState<AppAlertPayload | null>(null);
  const shouldUseCustomAlert = Platform.OS === 'android';

  useEffect(() => {
    if (!shouldUseCustomAlert) {
      return;
    }

    return registerAppAlertHandler(setCurrentAlert);
  }, [shouldUseCustomAlert]);

  const dismiss = () => setCurrentAlert(null);

  const actions = useMemo(() => {
    const fallbackButtons: AppAlertButton[] = [{ text: t('common.ok') }];
    return currentAlert?.buttons?.length ? currentAlert.buttons : fallbackButtons;
  }, [currentAlert?.buttons, t]);

  const dismissOnBackdropPress = currentAlert?.options?.dismissOnBackdropPress ?? true;
  const isHorizontalActions = actions.length <= 2;

  return (
    <View style={styles.container}>
      {children}

      {shouldUseCustomAlert && currentAlert ? (
        <Pressable
          style={styles.backdrop}
          onPress={dismissOnBackdropPress ? dismiss : undefined}
          accessibilityRole="alert"
        >
          <Pressable style={styles.card} onPress={() => {}}>
            <View style={styles.content}>
              <Text variant="h2" style={styles.title}>
                {currentAlert.title}
              </Text>

              {currentAlert.message ? (
                <Text variant="body" style={styles.message}>
                  {currentAlert.message}
                </Text>
              ) : null}
            </View>

            <View
              style={[
                styles.actions,
                isHorizontalActions ? styles.actionsRow : styles.actionsColumn,
              ]}
            >
              {actions.map((action, index) => (
                <Pressable
                  key={action.text}
                  onPress={() => {
                    dismiss();
                    action.onPress?.();
                  }}
                  style={[
                    styles.actionButton,
                    isHorizontalActions
                      ? styles.actionButtonHorizontal
                      : styles.actionButtonVertical,
                    !isHorizontalActions && index > 0 ? styles.actionButtonVerticalBorder : null,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={action.text}
                >
                  <Text
                    variant="body"
                    weight={action.style === 'cancel' ? 'semibold' : 'medium'}
                    style={[
                      styles.actionText,
                      isDestructive(action) ? styles.actionTextDestructive : null,
                    ]}
                  >
                    {action.text}
                  </Text>
                </Pressable>
              ))}
              {isHorizontalActions && actions.length === 2 ? (
                <View style={styles.actionDivider} />
              ) : null}
            </View>
          </Pressable>
        </Pressable>
      ) : null}
    </View>
  );
}

export function useAppAlert() {
  return appAlert;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.overlay.modal,
    padding: theme.metrics.spacing.p16,
  },
  card: {
    width: '84%',
    maxWidth: 360,
    overflow: 'hidden',
    backgroundColor: theme.colors.mode === 'dark' ? '#2B2B2F' : '#F7F7F8',
    borderRadius: 20,
    shadowColor: theme.colors.shadow.color,
    shadowOpacity: 0.22,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: theme.colors.shadow.elevationLarge,
  },
  content: {
    paddingHorizontal: theme.metrics.spacing.p24,
    paddingTop: theme.metrics.spacing.p24,
    paddingBottom: theme.metrics.spacing.p20,
    gap: theme.metrics.spacingV.p12,
  },
  title: {
    color: theme.colors.text.primary,
    textAlign: 'center' as const,
    fontSize: theme.fonts.size.xl,
    lineHeight: theme.fonts.size.xl * 1.2,
  },
  message: {
    color: theme.colors.mode === 'dark' ? 'rgba(255,255,255,0.76)' : 'rgba(0,0,0,0.78)',
    textAlign: 'center' as const,
    lineHeight: theme.fonts.size.md * 1.35,
  },
  actions: {
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: theme.colors.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.16)',
  },
  actionsRow: {
    flexDirection: 'row' as const,
  },
  actionsColumn: {
    flexDirection: 'column' as const,
  },
  actionButton: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minHeight: 56,
    paddingHorizontal: theme.metrics.spacing.p16,
    backgroundColor: 'transparent',
  },
  actionButtonHorizontal: {
    flex: 1,
  },
  actionButtonVertical: {
    width: '100%',
  },
  actionButtonVerticalBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.16)',
  },
  actionDivider: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 1,
    backgroundColor:
      theme.colors.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.16)',
  },
  actionText: {
    color: theme.colors.mode === 'dark' ? '#5AA9FF' : '#007AFF',
    textAlign: 'center' as const,
    fontSize: theme.fonts.size.lg,
  },
  actionTextDestructive: {
    color: theme.colors.state.error,
  },
}));
