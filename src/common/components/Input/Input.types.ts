import type { TextInputProps } from 'react-native';
import type { ComponentSize } from '@/common/components/shared.types';

/** Props for the {@link Input} component. Extends React Native's TextInputProps. */
export interface InputProps extends TextInputProps {
  /** Optional label displayed above the input. */
  label?: string;
  /** Whether the input is required. Displays a red asterisk next to the label. */
  required?: boolean;
  /** Error message displayed below the input. Takes precedence over `helperText`. */
  error?: string;
  /** Helper text displayed below the input when no error is present. */
  helperText?: string;
  /** Whether the input is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Size variant controlling height and padding. Defaults to `'md'`. */
  size?: ComponentSize;
  /** Optional icon element rendered on the left side of the input. */
  leftIcon?: React.ReactNode;
  /** Optional icon element rendered on the right side of the input. Replaced by password toggle when `secureTextEntry` is set. */
  rightIcon?: React.ReactNode;
  /** Whether the input is read-only. Keeps interactions enabled for wrapper actions. */
  readOnly?: boolean;
  /** Optional press handler for read-only trigger behavior. */
  onPress?: () => void;
  /** Optional clear handler for trailing clear action. */
  onClear?: () => void;
}
