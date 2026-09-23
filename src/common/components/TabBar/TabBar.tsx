import {
  ArrowLeftRight,
  Box,
  Circle,
  History,
  LayoutDashboard,
  Package,
  Settings,
  Thermometer,
  TriangleAlert,
  Wrench,
  type LucideIcon,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnistyles } from 'react-native-unistyles';
import { hs, vs } from '@/theme/metrics';
import { styles } from './TabBar.styles';
import type { TabBarProps } from './TabBar.types';

const TAB_ICONS: Record<string, LucideIcon> = {
  index: LayoutDashboard,
  devices: Thermometer,
  alerts: TriangleAlert,
  batches: Package,
  settings: Settings,
  history: History,
  defect: TriangleAlert,
  'in-out-mold': ArrowLeftRight,
  molds: Box,
  maintenances: Wrench,
};

const ACTIVE_INDICATOR_HORIZONTAL_INSET = hs(2);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function TabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const [tabLayouts, setTabLayouts] = useState<Record<number, { x: number; width: number }>>({});
  const progress = useSharedValue(state.index);

  useEffect(() => {
    progress.value = withSpring(state.index, {
      damping: 18,
      stiffness: 180,
      mass: 0.8,
    });
  }, [progress, state.index]);

  const handleTabLayout = (index: number, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;

    setTabLayouts((current) => {
      const previous = current[index];

      if (previous?.x === x && previous.width === width) {
        return current;
      }

      return {
        ...current,
        [index]: { x, width },
      };
    });
  };

  const indicatorPositions = state.routes.map((_, index) => {
    const layout = tabLayouts[index];

    if (!layout) {
      return 0;
    }

    return layout.x + ACTIVE_INDICATOR_HORIZONTAL_INSET;
  });

  const indicatorWidths = state.routes.map((_, index) => {
    const layout = tabLayouts[index];

    if (!layout) {
      return 0;
    }

    return Math.max(layout.width - ACTIVE_INDICATOR_HORIZONTAL_INSET * 2, 0);
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const inputRange = state.routes.map((_, index) => index);
    const hasAllLayouts = Object.keys(tabLayouts).length === state.routes.length;

    const translateX =
      inputRange.length > 1
        ? interpolate(progress.value, inputRange, indicatorPositions)
        : (indicatorPositions[0] ?? 0);

    const width =
      inputRange.length > 1
        ? interpolate(progress.value, inputRange, indicatorWidths)
        : (indicatorWidths[0] ?? 0);

    return {
      opacity: hasAllLayouts ? 1 : 0,
      width,
      transform: [{ translateX }],
    };
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, vs(6)) }]}>
        <View style={styles.containerOverlay} />

        <View style={styles.tabsInnerContainer}>
          <Animated.View style={[styles.activeIndicator, indicatorStyle]} />

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const TabIcon = TAB_ICONS[route.name] ?? Circle;
            const label = resolveLabel(options);
            const customIcon = options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? theme.colors.brand.primary : theme.colors.text.primary,
              size: 22,
            });

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TabBarItem
                key={route.key}
                index={index}
                label={label}
                isFocused={isFocused}
                icon={TabIcon}
                customIcon={customIcon}
                onPress={onPress}
                onLongPress={onLongPress}
                onLayout={handleTabLayout}
                accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
                colors={{
                  active: theme.colors.brand.primary,
                  inactive: theme.colors.text.primary,
                  activeText: theme.colors.brand.primary,
                  inactiveText: theme.colors.text.primary,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TabBarItem({
  index,
  label,
  isFocused,
  icon: IconComponent,
  customIcon,
  badge,
  onPress,
  onLongPress,
  onLayout,
  accessibilityLabel,
  colors,
}: {
  index: number;
  label: string;
  isFocused: boolean;
  icon: LucideIcon;
  customIcon?: ReactNode;
  badge?: ReactNode;
  onPress: () => void;
  onLongPress: () => void;
  onLayout: (index: number, event: LayoutChangeEvent) => void;
  accessibilityLabel: string;
  colors: {
    active: string;
    inactive: string;
    activeText: string;
    inactiveText: string;
  };
}) {
  const iconProgress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    iconProgress.value = withTiming(isFocused ? 1 : 0, { duration: 220 });
  }, [iconProgress, isFocused]);

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(iconProgress.value, [0, 1], [colors.inactiveText, colors.activeText]),
    opacity: withTiming(iconProgress.value === 1 ? 1 : 0.82, { duration: 220 }),
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={accessibilityLabel}
      onLayout={(event) => onLayout(index, event)}
      style={styles.tab}
    >
      <View style={styles.tabInner}>
        <View style={styles.iconWrap}>
          {customIcon ?? (
            <IconComponent
              size={22}
              color={isFocused ? colors.active : colors.inactive}
              strokeWidth={2.1}
              absoluteStrokeWidth
            />
          )}
          {badge}
        </View>
        <Animated.Text style={[styles.tabLabel, labelStyle]} numberOfLines={1}>
          {label}
        </Animated.Text>
      </View>
    </AnimatedPressable>
  );
}

function resolveLabel(options: TabBarProps['descriptors'][string]['options']) {
  if (typeof options.title === 'string') {
    return options.title;
  }

  if (typeof options.tabBarLabel === 'string') {
    return options.tabBarLabel;
  }

  return '';
}
