import { ArrowUp } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { IconButton } from '@/common/components/IconButton';
import { hs, vs } from '@/theme/metrics';
import type { ScrollToTopButtonProps } from './ScrollToTopButton.types';

export function ScrollToTopButton({ onPress, accessibilityLabel, style }: ScrollToTopButtonProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();

  return (
    <IconButton
      icon={ArrowUp}
      variant="outline"
      size="sm"
      color={theme.colors.icon.primary}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? t('common.scrollToTop')}
      style={[styles.fabButton, style]}
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  fabButton: {
    width: hs(38),
    height: vs(38),
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: theme.colors.background.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
}));
