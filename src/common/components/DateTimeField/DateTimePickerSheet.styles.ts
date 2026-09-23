import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  sheetBackground: {
    backgroundColor: theme.colors.background.surface,
  },
  sheetHandle: {
    backgroundColor: theme.colors.border.default,
  },
  sheetContent: {
    flex: 1,
  },
  divider: {
    marginVertical: theme.metrics.spacingV.p8,
    backgroundColor: theme.colors.border.subtle,
  },
}));
