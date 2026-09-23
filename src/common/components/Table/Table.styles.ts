import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    borderRadius: theme.metrics.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.background.surface,
    overflow: 'hidden',
    variants: {
      bordered: {
        true: {},
        false: {
          borderWidth: 0,
        },
      },
    },
  },
  scrollContent: {
    flexGrow: 1,
  },
  table: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.surfaceAlt,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.surface,
  },
  cell: {
    flexShrink: 0,
    justifyContent: 'center',
    paddingHorizontal: theme.metrics.spacing.p16,
    paddingVertical: theme.metrics.spacingV.p16,
    borderRightWidth: 1,
    borderRightColor: theme.colors.border.default,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.default,
    minHeight: theme.metrics.spacingV.p56,
    variants: {
      density: {
        compact: {
          paddingVertical: theme.metrics.spacingV.p12,
          minHeight: theme.metrics.spacingV.p44,
        },
        comfortable: {},
        spacious: {
          paddingVertical: theme.metrics.spacingV.p20,
          minHeight: theme.metrics.spacingV.p64,
        },
      },
      bordered: {
        true: {},
        false: {
          borderRightWidth: 0,
          borderTopWidth: 0,
        },
      },
    },
  },
  headerCell: {
    minHeight: theme.metrics.spacingV.p64,
    borderTopWidth: 0,
    variants: {
      density: {
        compact: {
          minHeight: theme.metrics.spacingV.p52,
        },
        comfortable: {},
        spacious: {
          minHeight: theme.metrics.spacingV.p72,
        },
      },
      bordered: {
        true: {},
        false: {
          borderTopWidth: 0,
          borderRightWidth: 0,
        },
      },
    },
  },
  headerText: {
    color: theme.colors.text.secondary,
  },
  cellText: {
    color: theme.colors.text.primary,
  },
  actionCell: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.metrics.spacing.p12,
  },
  actionButton: {
    minWidth: theme.metrics.spacing.p24,
    minHeight: theme.metrics.spacing.p24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    paddingHorizontal: theme.metrics.spacing.p16,
    paddingVertical: theme.metrics.spacingV.p24,
  },
  rowLastCell: {
    borderRightWidth: 0,
  },
  noBorderTop: {
    borderTopWidth: 0,
  },
  rowPressable: {
    opacity: 0.98,
  },
  headerAlignLeft: {
    alignItems: 'flex-start',
  },
  headerAlignCenter: {
    alignItems: 'center',
  },
  headerAlignRight: {
    alignItems: 'flex-end',
  },
  cellAlignLeft: {
    alignItems: 'flex-start',
  },
  cellAlignCenter: {
    alignItems: 'center',
  },
  cellAlignRight: {
    alignItems: 'flex-end',
  },
}));

export type TableStyleVariants = UnistylesVariants<typeof styles>;
