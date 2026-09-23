import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  wrapper: {
    gap: theme.metrics.spacingV.p4,
    width: '100%',
    minWidth: 0,
  },
  label: {
    color: theme.colors.text.secondary,
  },
  trigger: {
    minHeight: 44,
    borderRadius: theme.metrics.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    backgroundColor: theme.colors.background.surface,
    paddingHorizontal: theme.metrics.spacing.p12,
    paddingVertical: theme.metrics.spacingV.p12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p8,
  },
  triggerDisabled: {
    opacity: 0.5,
  },
  triggerPressed: {
    backgroundColor: theme.colors.background.elevated,
    borderColor: theme.colors.border.focus,
  },
  content: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p8,
  },
  valueText: {
    flex: 1,
    minWidth: 0,
  },
  valueTextActive: {
    color: theme.colors.text.primary,
  },
  placeholderText: {
    color: theme.colors.text.muted,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: theme.colors.state.error,
  },
}));
