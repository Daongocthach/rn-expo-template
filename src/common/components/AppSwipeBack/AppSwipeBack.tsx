import { usePathname, useRouter } from 'expo-router';
import { ChevronLeft, Loader } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';

const THRESHOLD = 80;
const BUBBLE_WIDTH = 48;
const BUBBLE_HEIGHT = 64;

export function AppSwipeBack() {
  const router = useRouter();
  const pathname = usePathname();
  const { height: screenHeight } = useWindowDimensions();

  const [isBacking, setIsBacking] = useState(false);

  // Check if we can navigate back on path change
  const canGoBack = useMemo(() => {
    // Reference pathname to force re-evaluation on screen transitions
    return pathname ? router.canGoBack() : router.canGoBack();
  }, [pathname, router]);

  // Animated values
  const dragX = useSharedValue(0);
  const touchY = useSharedValue(0);
  const spinValue = useSharedValue(0);

  // Rotate animation for the RotateCcw icon during back action
  useEffect(() => {
    if (isBacking) {
      spinValue.value = withRepeat(
        withTiming(360, { duration: 800, easing: Easing.linear }),
        -1, // infinite
        false // do not reverse
      );
    } else {
      spinValue.value = 0;
    }
  }, [isBacking, spinValue]);

  // Back trigger callback executed on JS thread
  const handleBackTrigger = useCallback(() => {
    setIsBacking(true);
    router.back();

    // Hold the indicator briefly, then slide it back to hidden and reset state
    setTimeout(() => {
      dragX.value = withTiming(0, { duration: 250 }, () => {
        runOnJS(setIsBacking)(false);
      });
    }, 450);
  }, [router, dragX]);

  // Pan gesture tracking edge swipes
  const panGesture = useMemo(() => {
    return Gesture.Pan()
      .enabled(canGoBack && !isBacking)
      .activeOffsetX([0, 10]) // Activate when dragging to the right
      .onStart((event) => {
        touchY.value = event.absoluteY;
      })
      .onUpdate((event) => {
        dragX.value = Math.max(event.translationX, 0);
        touchY.value = event.absoluteY;
      })
      .onEnd(() => {
        if (dragX.value >= THRESHOLD) {
          dragX.value = withTiming(THRESHOLD, { duration: 150 });
          runOnJS(handleBackTrigger)();
        } else {
          dragX.value = withTiming(0, { duration: 200 });
        }
      });
  }, [canGoBack, isBacking, handleBackTrigger, dragX, touchY]);

  // Animated styles for the floating bubble
  const bubbleStyle = useAnimatedStyle(() => {
    // Opacity fades in from 0 to 1
    const opacity = interpolate(dragX.value, [0, THRESHOLD * 0.3, THRESHOLD], [0, 0.9, 1], 'clamp');

    // Scale grows and gets slightly larger/elastic when armed (exceeds threshold)
    const scale = interpolate(
      dragX.value,
      [0, THRESHOLD * 0.8, THRESHOLD],
      [0.6, 1, 1.15],
      'clamp'
    );

    // Position trundles out of the screen left edge
    const translateX = interpolate(dragX.value, [0, THRESHOLD], [-BUBBLE_WIDTH, 0], 'clamp');

    // Clamp Y translation to keep bubble fully visible on screen
    const clampedY = Math.min(
      Math.max(touchY.value - BUBBLE_HEIGHT / 2, 20),
      screenHeight - BUBBLE_HEIGHT - 20
    );

    return {
      opacity,
      transform: [{ translateX }, { translateY: clampedY }, { scale }],
    };
  });

  // Animated style for spinning rotate icon
  const rotatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinValue.value}deg` }],
    };
  });

  if (!canGoBack && !isBacking) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Left Edge Touch Zone */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.edgeTouchZone} />
      </GestureDetector>

      {/* Floating Indicator Bubble */}
      <Animated.View style={[styles.bubble, bubbleStyle]}>
        {isBacking ? (
          <Animated.View style={rotatedIconStyle}>
            <Icon icon={Loader} variant="primary" size={20} />
          </Animated.View>
        ) : (
          <Icon icon={ChevronLeft} variant="primary" size={22} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  edgeTouchZone: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 25,
    backgroundColor: 'transparent',
    zIndex: theme.colors.mode === 'dark' ? 98 : 49,
  },
  bubble: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: BUBBLE_WIDTH,
    height: BUBBLE_HEIGHT,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    borderLeftWidth: 0,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    backgroundColor: theme.colors.background.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    zIndex: theme.colors.mode === 'dark' ? 100 : 51,
  },
}));
