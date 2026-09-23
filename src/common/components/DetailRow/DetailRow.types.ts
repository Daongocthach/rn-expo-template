import type { ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface DetailRowProps {
  /** Label content on the left. */
  label: string;
  /** Value content on the right (can be a string, number, null or custom ReactNode/badge). */
  value?: ReactNode;
  /** Optional badge component to display on the right (shortcut for value). */
  badge?: ReactNode;
  /** Optional flag to hide the bottom border divider. Defaults to `false`. */
  isLast?: boolean;
  /** Optional flag to explicitly control bottom border divider visibility. */
  hasDivider?: boolean;
  /** Optional style for the outer row container. */
  style?: StyleProp<ViewStyle>;
  /** Optional style for the label text. */
  labelStyle?: StyleProp<TextStyle>;
  /** Optional style for the value text (only applies when value is text). */
  valueStyle?: StyleProp<TextStyle>;
}
