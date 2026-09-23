import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.overlay.modal,
    justifyContent: 'center',
    padding: theme.metrics.spacing.p16,
  },
  card: {
    maxHeight: '92%',
    borderRadius: theme.metrics.borderRadius.xl,
    backgroundColor: theme.colors.background.modal,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.metrics.spacing.p20,
    paddingTop: theme.metrics.spacingV.p16,
    paddingBottom: theme.metrics.spacingV.p8,
    gap: theme.metrics.spacing.p12,
  },
  headerSpacer: {
    flex: 1,
  },
  title: {
    flex: 1,
  },
  content: {
    flexShrink: 1,
    paddingHorizontal: theme.metrics.spacing.p20,
    paddingTop: theme.metrics.spacingV.p8,
    paddingBottom: theme.metrics.spacingV.p20,
  },
}));
