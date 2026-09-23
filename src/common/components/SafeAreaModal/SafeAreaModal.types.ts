import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface SafeAreaModalProps {
  visible: boolean;
  onDismiss: () => void;
  children: ReactNode;
  title?: string;
  dismissOnBackdropPress?: boolean;
  showCloseButton?: boolean;
  backdropStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  closeAccessibilityLabel?: string;
}
