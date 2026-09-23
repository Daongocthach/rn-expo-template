import type { LucideIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';
import { UniActivityIndicator } from '@/common/components/uni';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { ICON_SIZES, styles } from './IconButton.styles';
import type { IconButtonProps } from './IconButton.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * A pressable button that displays a single icon with animated press feedback.
 *
 * @example
 * ```tsx
 * <IconButton icon="trash-outline" variant="ghost" onPress={handleDelete} accessibilityLabel="Delete item" />
 * ```
 */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  loading = false,
  color,
  style,
  onPress,
  accessibilityLabel,
}: IconButtonProps) {
  const { theme } = useUnistyles();
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();
  const LucideIcon = icon as LucideIcon;

  styles.useVariants({ variant, size, disabled: disabled || loading });

  const iconSize = ICON_SIZES[size] ?? ICON_SIZES.md;

  const colorMap = {
    primary: theme.colors.text.onBrand,
    secondary: theme.colors.text.primary,
    outline: theme.colors.brand.primary,
    ghost: theme.colors.icon.primary,
  };
  const resolvedColor = color ?? colorMap[variant];

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={[styles.container, animatedStyle, style]}
    >
      {loading ? (
        <UniActivityIndicator size="small" uniProps={() => ({ color: resolvedColor })} />
      ) : (
        <LucideIcon
          size={iconSize}
          color={resolvedColor}
          accessibilityRole="image"
          accessibilityLabel={accessibilityLabel}
          strokeWidth={2}
          absoluteStrokeWidth
        />
      )}
    </AnimatedPressable>
  );
}
