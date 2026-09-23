import type { StyleProp, ViewStyle } from 'react-native';

export interface TabViewRoute {
  key: string;
  title: string;
  renderScene: () => React.ReactNode;
  badge?: string | number;
  accessibilityLabel?: string;
}

export interface TabViewProps {
  routes: TabViewRoute[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number, route: TabViewRoute) => void;
  headerTitle?: string;
  headerSubtitle?: string;
  headerRight?: React.ReactNode;
  renderHeader?: () => React.ReactNode;
  lazy?: boolean;
  swipeEnabled?: boolean;
  tabBarStyle?: StyleProp<ViewStyle>;
  sceneContainerStyle?: StyleProp<ViewStyle>;
}
