import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  backdrop: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.overlay.modal,
    padding: theme.metrics.spacing.p16,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    borderRadius: theme.metrics.borderRadius.xl,
    backgroundColor: theme.colors.background.modal,
    paddingHorizontal: theme.metrics.spacing.p24,
    paddingVertical: theme.metrics.spacingV.p20,
    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: theme.colors.shadow.elevationLarge,
  },
  helperText: {
    marginTop: theme.metrics.spacingV.p12,
    textAlign: 'center',
    color: theme.colors.text.secondary,
  },
}));
