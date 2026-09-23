import type { LucideIcon } from 'lucide-react-native';
import type { StyleProp, ViewStyle } from 'react-native';

/** Visual style variant for the IconButton component. */
export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

/** Size variant for the IconButton component. */
export type IconButtonSize = 'sm' | 'md' | 'lg';

/** Props for the {@link IconButton} component. */
export interface IconButtonProps {
  /** Lucide icon component to display. */
  icon: LucideIcon;
  /** Visual style variant. Defaults to `'ghost'`. */
  variant?: IconButtonVariant;
  /** Size of the button. Defaults to `'md'`. */
  size?: IconButtonSize;
  /** Whether the button is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Whether to show a loading indicator instead of the icon. Defaults to `false`. */
  loading?: boolean;
  /** Optional icon color override. */
  color?: string;
  /** Optional style override for the button container. */
  style?: StyleProp<ViewStyle>;
  /** Callback invoked when the button is pressed. */
  onPress?: () => void;
  /** Required accessibility label for screen readers. */
  accessibilityLabel: string;
}
