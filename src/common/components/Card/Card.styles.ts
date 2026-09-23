import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';
import { hs } from '@/theme/metrics';

export const styles = StyleSheet.create((theme) => ({
  card: {
    borderRadius: theme.metrics.borderRadius.xl,
    padding: {
      xs: theme.metrics.spacing.p12,
      sm: theme.metrics.spacing.p16,
      lg: theme.metrics.spacing.p24,
    },
    variants: {
      variant: {
        filled: {
          backgroundColor: theme.colors.background.surface,
        },
        elevated: {
          backgroundColor: theme.colors.background.elevated,
          elevation: theme.colors.shadow.elevationMedium,
          shadowColor: theme.colors.shadow.color,
          shadowOffset: { width: 0, height: hs(2) },
          shadowOpacity: 0.1,
          shadowRadius: hs(8),
        },
        outlined: {
          backgroundColor: theme.colors.background.surface,
          borderWidth: 1,
          borderColor: theme.colors.border.default,
        },
      },
    },
  },
  indicatorClip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 1,
  },
  indicatorInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
}));

export type CardStyleVariants = UnistylesVariants<typeof styles>;
