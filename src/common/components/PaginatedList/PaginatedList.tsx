import { FlashList, type FlashListRef } from '@shopify/flash-list';
import {
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentType,
  type ForwardedRef,
  type ReactElement,
} from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { View, StyleSheet as RNStyleSheet } from 'react-native';
import { useKeyboardState } from 'react-native-keyboard-controller';
import { StyleSheet } from 'react-native-unistyles';
import { EmptyState } from '@/common/components/EmptyState';
import { Loading } from '@/common/components/Loading';
import { AppRefreshControl } from '@/common/components/RefreshControl';
import { ScrollToTopButton } from '@/common/components/ScrollToTopButton';
import { useBottomPadding } from '@/hooks';
import { hs, vs } from '@/theme/metrics';
import type { PaginatedListProps, PaginatedListRef } from './PaginatedList.types';

export const PaginatedList = forwardRef(
  <T,>(
    {
      data,
      keyExtractor,
      renderItem,
      numColumns,
      loading = false,
      refreshing = false,
      onRefresh,
      hasNextPage = false,
      isLoadingMore = false,
      onLoadMore,
      emptyState,
      style,
      contentContainerStyle,
      tabBarAware = false,
      onScroll,
      scrollEventThrottle = 16,
      ListHeaderComponent,
      ItemSeparatorComponent,
      ListFooterComponent,
      stickyHeaderIndices,
      onEndReachedThreshold = 0.5,
      drawDistance = 1000,
      refreshControlProps,
      showScrollToTop = true,
      scrollToTopThreshold = 30,
      scrollToTopBottomOffset,
    }: PaginatedListProps<T>,
    ref: ForwardedRef<PaginatedListRef<T>>
  ) => {
    const bottomPadding = useBottomPadding(tabBarAware);
    const keyboardHeight = useKeyboardState((state) => (state.isVisible ? state.height : 0));
    const internalRef = useRef<FlashListRef<T>>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useImperativeHandle(ref, () => internalRef.current as FlashListRef<T>);

    if (loading) {
      return <Loading fullScreen />;
    }

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScroll?.(event);
      if (showScrollToTop) {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > scrollToTopThreshold);
      }
    };

    const handleScrollToTop = () => {
      internalRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const scrollToTopBottom =
      scrollToTopBottomOffset ?? (tabBarAware ? bottomPadding + vs(16) : vs(16));

    const footer =
      isLoadingMore || ListFooterComponent ? (
        <View style={styles.footer}>
          {renderListComponent(ListFooterComponent)}
          {isLoadingMore && <Loading size="small" />}
        </View>
      ) : null;

    const emptyComponent =
      data.length === 0 && emptyState ? <EmptyState {...emptyState} /> : undefined;

    return (
      <View style={styles.container}>
        <FlashList
          ref={internalRef}
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={numColumns}
          drawDistance={drawDistance}
          horizontal={false}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          style={RNStyleSheet.flatten([{ flex: 1 }, style])}
          refreshControl={
            onRefresh ? (
              <AppRefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                {...refreshControlProps}
              />
            ) : undefined
          }
          contentContainerStyle={[
            contentContainerStyle,
            { paddingBottom: bottomPadding + Math.max(0, keyboardHeight) },
          ]}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
          scrollEventThrottle={scrollEventThrottle}
          onEndReached={() => {
            if (hasNextPage && !isLoadingMore) {
              onLoadMore?.();
            }
          }}
          onEndReachedThreshold={onEndReachedThreshold}
          ListHeaderComponent={ListHeaderComponent}
          stickyHeaderIndices={stickyHeaderIndices}
          ItemSeparatorComponent={ItemSeparatorComponent ?? DefaultItemSeparator}
          ListEmptyComponent={emptyComponent}
          ListFooterComponent={footer}
        />

        {showScrollToTop && showScrollTop ? (
          <View style={[styles.scrollTopFabWrap, { bottom: scrollToTopBottom }]}>
            <ScrollToTopButton onPress={handleScrollToTop} />
          </View>
        ) : null}
      </View>
    );
  }
) as <T>(
  props: PaginatedListProps<T> & { ref?: ForwardedRef<PaginatedListRef<T>> }
) => ReactElement;

function renderListComponent<T>(component: PaginatedListProps<T>['ListFooterComponent']) {
  if (!component) {
    return null;
  }

  if (isValidElement(component)) {
    return component;
  }

  const Component = component as ComponentType;
  return <Component />;
}

function DefaultItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    position: 'relative',
  },
  footer: {
    paddingVertical: theme.metrics.spacingV.p16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.metrics.spacingV.p8,
  },
  separator: {
    height: theme.metrics.spacingV.p12,
  },
  scrollTopFabWrap: {
    position: 'absolute',
    right: hs(16),
    zIndex: 999,
    elevation: 10,
  },
}));
