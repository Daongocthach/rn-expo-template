import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.metrics.spacingV.p4,
    borderBottomWidth: 0,
    gap: theme.metrics.spacing.p12,
  },
  detailLabel: {
    flexShrink: 0,
  },
  detailValue: {
    color: theme.colors.text.primary,
    flexShrink: 1,
    textAlign: 'right',
  },
  valueContainer: {
    flexShrink: 1,
    alignItems: 'flex-end',
  },
  hasDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
    paddingVertical: theme.metrics.spacingV.p12,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
}));
