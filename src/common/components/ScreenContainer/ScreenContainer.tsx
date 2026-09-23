import { View, ScrollView } from 'react-native';
import { useBottomPadding } from '@/hooks';
import { styles } from './ScreenContainer.styles';
import type { ScreenContainerProps } from './ScreenContainer.types';

/**
 * A safe-area-aware screen wrapper that supports both static and scrollable layouts.
 *
 * @example
 * ```tsx
 * <ScreenContainer scrollable padded edges={['top', 'bottom']}>
 *   <Text>Screen content</Text>
 * </ScreenContainer>
 * ```
 */
export function ScreenContainer({
  children,
  scrollable = false,
  padded = true,
  tabBarAware = false,
  transparent = false,
  edges = [''],
  style,
  refreshControl,
}: ScreenContainerProps) {
  const hasTop = edges.includes('top');
  const hasBottom = edges.includes('bottom');
  const bottomPadding = useBottomPadding(tabBarAware);
  const backgroundStyle = transparent ? styles.transparent : styles.container;

  if (scrollable) {
    return (
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={[
          hasTop && styles.edgeTop,
          hasBottom && styles.edgeBottom,
          tabBarAware ? { paddingBottom: bottomPadding } : null,
          padded && styles.padded,
          style,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        backgroundStyle,
        hasTop && styles.edgeTop,
        hasBottom && styles.edgeBottom,
        tabBarAware ? { paddingBottom: bottomPadding } : null,
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}
