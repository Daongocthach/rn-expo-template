import type { StyleProp, ViewStyle } from 'react-native';

export interface ScrollToTopButtonProps {
  onPress: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}
