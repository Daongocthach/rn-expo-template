import { useEffect, useMemo, useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import { TabView as RNTabView } from 'react-native-tab-view';
import type { NavigationState, Route, SceneRendererProps } from 'react-native-tab-view';
import { Text } from '@/common/components/Text';
import { styles } from './TabView.styles';
import type { TabViewProps, TabViewRoute } from './TabView.types';

interface InternalRoute extends Route {
  title: string;
}

export function TabView({
  routes,
  index,
  defaultIndex = 0,
  onIndexChange,
  headerTitle,
  headerSubtitle,
  headerRight,
  renderHeader,
  lazy = false,
  swipeEnabled = true,
  tabBarStyle,
  sceneContainerStyle,
}: TabViewProps) {
  const layout = useWindowDimensions();
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const isControlled = typeof index === 'number';
  const resolvedIndex = isControlled ? index : internalIndex;

  useEffect(() => {
    if (!isControlled) {
      return;
    }

    setInternalIndex(index);
  }, [index, isControlled]);

  const navigationRoutes = useMemo<InternalRoute[]>(
    () =>
      routes.map((route) => ({
        key: route.key,
        title: route.title,
      })),
    [routes]
  );

  const navigationState = useMemo<NavigationState<InternalRoute>>(
    () => ({
      index: Math.min(Math.max(resolvedIndex, 0), Math.max(routes.length - 1, 0)),
      routes: navigationRoutes,
    }),
    [navigationRoutes, resolvedIndex, routes.length]
  );

  const routesByKey = useMemo(
    () =>
      routes.reduce<Record<string, TabViewRoute>>((accumulator, route) => {
        accumulator[route.key] = route;
        return accumulator;
      }, {}),
    [routes]
  );

  const handleIndexChange = (nextIndex: number) => {
    if (!isControlled) {
      setInternalIndex(nextIndex);
    }

    const nextRoute = routes[nextIndex];
    if (nextRoute) {
      onIndexChange?.(nextIndex, nextRoute);
    }
  };

  const renderTabBar = ({
    navigationState: currentNavigationState,
  }: SceneRendererProps & {
    navigationState: NavigationState<InternalRoute>;
  }) => (
    <View style={[styles.tabBar, tabBarStyle]}>
      {currentNavigationState.routes.map((route, routeIndex) => {
        const tabRoute = routesByKey[route.key];
        const isActive = routeIndex === currentNavigationState.index;

        return (
          <Pressable
            key={route.key}
            onPress={() => handleIndexChange(routeIndex)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tabRoute?.accessibilityLabel ?? tabRoute?.title ?? route.title}
            style={[styles.tabItem, isActive && styles.tabItemActive]}
          >
            <Text
              variant="label"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              style={[styles.tabItemLabel, isActive && styles.tabItemLabelActive]}
            >
              {route.title}
            </Text>
            {typeof tabRoute?.badge !== 'undefined' ? (
              <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
                <Text
                  variant="caption"
                  weight="medium"
                  style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}
                >
                  {String(tabRoute.badge)}
                </Text>
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );

  const renderScene = ({ route }: { route: InternalRoute }) => {
    return routesByKey[route.key]?.renderScene() ?? null;
  };

  const shouldRenderDefaultHeader = !!headerTitle || !!headerSubtitle || !!headerRight;

  return (
    <View style={styles.container}>
      {renderHeader?.()}
      {shouldRenderDefaultHeader ? (
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            {headerTitle ? <Text variant="h3">{headerTitle}</Text> : null}
            {headerSubtitle ? (
              <Text variant="bodySmall" color="secondary">
                {headerSubtitle}
              </Text>
            ) : null}
          </View>
          {headerRight}
        </View>
      ) : null}

      <RNTabView
        lazy={lazy}
        swipeEnabled={swipeEnabled}
        navigationState={navigationState}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        style={styles.tabView}
        commonOptions={{
          sceneStyle: [styles.sceneContainer, sceneContainerStyle],
        }}
      />
    </View>
  );
}
