import { Platform } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';
import { hs } from '@/theme/metrics';

export const styles = StyleSheet.create((theme) => ({
  badge: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: theme.metrics.borderRadius.sm,
    variants: {
      variant: {
        solid: {
          borderWidth: 0,
        },
        outline: {
          borderWidth: 1,
          backgroundColor: 'transparent',
        },
        subtle: {
          borderWidth: 0,
        },
      },
      size: {
        sm: {
          minWidth: hs(18),
          minHeight: hs(18),
          paddingHorizontal: theme.metrics.spacing.p8,
          paddingVertical: theme.metrics.spacing.p4,
        },
        md: {
          minWidth: hs(22),
          minHeight: hs(22),
          paddingHorizontal: theme.metrics.spacing.p8,
          paddingVertical: theme.metrics.spacing.p4,
        },
      },
      colorScheme: {
        primary: {},
        success: {},
        error: {},
        warning: {},
        info: {},
        neutral: {},
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        colorScheme: 'primary',
        styles: {
          backgroundColor: theme.colors.brand.primary,
          borderColor: theme.colors.brand.primary,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'success',
        styles: {
          backgroundColor: theme.colors.state.success,
          borderColor: theme.colors.state.success,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'error',
        styles: {
          backgroundColor: theme.colors.state.error,
          borderColor: theme.colors.state.error,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'warning',
        styles: {
          backgroundColor: theme.colors.state.warning,
          borderColor: theme.colors.state.warning,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'info',
        styles: {
          backgroundColor: theme.colors.state.info,
          borderColor: theme.colors.state.info,
        },
      },
      {
        variant: 'solid',
        colorScheme: 'neutral',
        styles: {
          backgroundColor: theme.colors.text.tertiary,
          borderColor: theme.colors.text.tertiary,
        },
      },
      {
        variant: 'outline',
        colorScheme: 'primary',
        styles: { borderColor: theme.colors.brand.primary },
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        styles: { borderColor: theme.colors.state.success },
      },
      {
        variant: 'outline',
        colorScheme: 'error',
        styles: { borderColor: theme.colors.state.error },
      },
      {
        variant: 'outline',
        colorScheme: 'warning',
        styles: { borderColor: theme.colors.state.warning },
      },
      {
        variant: 'outline',
        colorScheme: 'info',
        styles: { borderColor: theme.colors.state.info },
      },
      {
        variant: 'outline',
        colorScheme: 'neutral',
        styles: { borderColor: theme.colors.border.subtle },
      },
      {
        variant: 'subtle',
        colorScheme: 'primary',
        styles: {
          backgroundColor: theme.colors.background.surfaceAlt,
          borderColor: theme.colors.background.surfaceAlt,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'success',
        styles: {
          backgroundColor: theme.colors.state.successBg,
          borderColor: theme.colors.state.successBg,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'error',
        styles: {
          backgroundColor: theme.colors.state.errorBg,
          borderColor: theme.colors.state.errorBg,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'warning',
        styles: {
          backgroundColor: theme.colors.state.warningBg,
          borderColor: theme.colors.state.warningBg,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'info',
        styles: {
          backgroundColor: theme.colors.state.infoBg,
          borderColor: theme.colors.state.infoBg,
        },
      },
      {
        variant: 'subtle',
        colorScheme: 'neutral',
        styles: {
          backgroundColor: theme.colors.background.surfaceAlt,
          borderColor: theme.colors.background.surfaceAlt,
        },
      },
    ],
  },
  badgeText: {
    variants: {
      variant: {
        solid: {},
        outline: {},
        subtle: {},
      },
      colorScheme: {
        primary: {},
        success: {},
        error: {},
        warning: {},
        info: {},
        neutral: {},
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        colorScheme: 'primary',
        styles: { color: theme.colors.brand.primary },
      },
      {
        variant: 'outline',
        colorScheme: 'success',
        styles: { color: theme.colors.state.success },
      },
      {
        variant: 'outline',
        colorScheme: 'error',
        styles: { color: theme.colors.state.error },
      },
      {
        variant: 'outline',
        colorScheme: 'warning',
        styles: { color: theme.colors.state.warning },
      },
      {
        variant: 'outline',
        colorScheme: 'info',
        styles: { color: theme.colors.state.info },
      },
      {
        variant: 'outline',
        colorScheme: 'neutral',
        styles: { color: theme.colors.text.secondary },
      },
      { variant: 'subtle', colorScheme: 'primary', styles: { color: theme.colors.brand.primary } },
      { variant: 'subtle', colorScheme: 'success', styles: { color: theme.colors.state.success } },
      { variant: 'subtle', colorScheme: 'error', styles: { color: theme.colors.state.error } },
      { variant: 'subtle', colorScheme: 'warning', styles: { color: theme.colors.state.warning } },
      { variant: 'subtle', colorScheme: 'info', styles: { color: theme.colors.state.info } },
      { variant: 'subtle', colorScheme: 'neutral', styles: { color: theme.colors.text.secondary } },
      { variant: 'solid', colorScheme: 'neutral', styles: { color: theme.colors.text.onBrand } },
    ],
  },
  badgeLabel: {
    fontSize: theme.fonts.size.xs - 1,
    lineHeight: Platform.OS === 'ios' ? theme.fonts.size.xs : undefined,
  },
  dotWrapper: {
    position: 'relative' as const,
  },
  dot: {
    position: 'absolute' as const,
    top: -2,
    right: -2,
    width: hs(8),
    height: hs(8),
    borderRadius: theme.metrics.borderRadius.xs,
    variants: {
      colorScheme: {
        primary: { backgroundColor: theme.colors.brand.primary },
        success: { backgroundColor: theme.colors.state.success },
        error: { backgroundColor: theme.colors.state.error },
        warning: { backgroundColor: theme.colors.state.warning },
        info: { backgroundColor: theme.colors.state.info },
      },
    },
  },
}));

export type BadgeStyleVariants = UnistylesVariants<typeof styles>;
