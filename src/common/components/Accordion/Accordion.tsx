import type { ReactNode } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';

export interface AccordionProps {
  isExpanded: boolean;
  viewKey: string | number;
  children: ReactNode;
  style?: ViewStyle;
  duration?: number;
}

export function Accordion({
  isExpanded,
  viewKey,
  children,
  style,
  duration = 250,
}: AccordionProps) {
  const height = useSharedValue(0);

  const animatedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded), { duration })
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    overflow: 'hidden',
  }));

  return (
    <Animated.View key={`accordionItem_${viewKey}`} style={[styles.animatedView, bodyStyle, style]}>
      <View
        onLayout={(event) => {
          height.value = event.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

export { Accordion as AccordionItem };

const styles = StyleSheet.create({
  animatedView: {
    width: '100%',
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
  },
});
