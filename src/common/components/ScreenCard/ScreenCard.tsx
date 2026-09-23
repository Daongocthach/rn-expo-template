import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Card } from '../Card';

interface ScreenCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ScreenCard({ children, style }: ScreenCardProps) {
  return (
    <Card variant="outlined" style={[styles.card, style]}>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    flex: 1,
    backgroundColor: theme.colors.background.surface,
    borderColor: theme.colors.border.default,
    borderWidth: 1,
    borderRadius: theme.metrics.borderRadius.xl,
  },
}));
