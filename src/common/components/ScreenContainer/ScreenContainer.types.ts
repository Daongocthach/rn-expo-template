import type { ReactElement, ReactNode } from 'react';
import type { RefreshControlProps, ViewStyle } from 'react-native';

/** Props for the {@link ScreenContainer} component. */
export interface ScreenContainerProps {
  /** Content to render inside the screen container. */
  children: ReactNode;
  /** Whether the container should be scrollable via a ScrollView. Defaults to `false`. */
  scrollable?: boolean;
  /** Whether to apply horizontal and vertical padding. Defaults to `true`. */
  padded?: boolean;
  /** Whether the screen sits above the tab bar and needs extra bottom padding. Defaults to `false`. */
  tabBarAware?: boolean;
  /** Whether to use a transparent background instead of the default app background. Defaults to `false`. */
  transparent?: boolean;
  /** Safe area edges to respect. Defaults to `['top']`. */
  edges?: ('top' | 'bottom' | '')[];
  /** Additional styles applied to the container or scroll content. */
  style?: ViewStyle;
  /** Refresh control element for the ScrollView. Only applicable if `scrollable` is `true`. */
  refreshControl?: ReactElement<RefreshControlProps>;
}
