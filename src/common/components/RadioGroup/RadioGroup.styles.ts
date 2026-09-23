import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';
import { hs } from '@/theme/metrics';

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.metrics.spacingV.p4,
    variants: {
      orientation: {
        vertical: {
          flexDirection: 'column',
        },
        horizontal: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: theme.metrics.spacing.p8,
        },
      },
    },
  },
  option: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.metrics.spacing.p12,
    paddingVertical: theme.metrics.spacingV.p12,
  },
  optionSelected: {},
  optionDisabled: {
    opacity: 0.5,
  },
  radio: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    width: hs(24),
    height: hs(24),
    borderRadius: theme.metrics.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.border.strong,
    backgroundColor: 'transparent',
    variants: {
      size: {
        sm: {
          width: hs(20),
          height: hs(20),
          borderRadius: theme.metrics.borderRadius.full,
        },
        md: {
          width: hs(24),
          height: hs(24),
          borderRadius: theme.metrics.borderRadius.full,
        },
        lg: {
          width: hs(28),
          height: hs(28),
          borderRadius: theme.metrics.borderRadius.full,
        },
      },
    },
  },
  radioSelected: {
    borderColor: theme.colors.brand.primary,
    backgroundColor: theme.colors.brand.primary,
  },
  radioDot: {
    width: hs(10),
    height: hs(10),
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: theme.colors.background.surface,
    variants: {
      size: {
        sm: {
          width: hs(8),
          height: hs(8),
          borderRadius: theme.metrics.borderRadius.full,
        },
        md: {
          width: hs(10),
          height: hs(10),
          borderRadius: theme.metrics.borderRadius.full,
        },
        lg: {
          width: hs(12),
          height: hs(12),
          borderRadius: theme.metrics.borderRadius.full,
        },
      },
    },
  },
  label: {
    flex: 1,
  },
}));

export type RadioGroupStyleVariants = UnistylesVariants<typeof styles>;
