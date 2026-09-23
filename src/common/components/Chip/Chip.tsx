import { CircleX } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';
import { Text } from '@/common/components/Text';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { styles } from './Chip.styles';
import type { ChipProps } from './Chip.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * A compact element used for selections, filters, or tags.
 *
 * @example
 * ```tsx
 * <Chip label="Featured" variant="solid" selected onPress={() => {}} />
 * ```
 */
export function Chip({
  label,
  text,
  variant = 'outline',
  size = 'md',
  shape = 'pill',
  selected = false,
  color,
  onPress,
  onClose,
  icon,
  disabled = false,
  style,
}: ChipProps) {
  const { theme } = useUnistyles();
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();
  const content = text ?? label ?? '';
  const isFilled = selected || variant === 'solid';

  let containerColorStyle:
    | {
        backgroundColor?: string;
        borderColor?: string;
      }
    | undefined;
  let labelColorStyle:
    | {
        color: string;
      }
    | undefined;
  let closeIconColor: string | undefined;

  if (color !== undefined) {
    if (isFilled) {
      containerColorStyle = { backgroundColor: color, borderColor: color };
      labelColorStyle = { color: theme.colors.text.onBrand };
      closeIconColor = theme.colors.icon.onBrand;
    } else {
      containerColorStyle = { borderColor: color };
      labelColorStyle = { color };
      closeIconColor = color;
    }
  }

  styles.useVariants({ variant, size, shape, selected, disabled });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || !onPress}
      accessibilityRole="button"
      accessibilityLabel={content}
      accessibilityState={{ selected, disabled }}
      style={[styles.container, containerColorStyle, animatedStyle, style]}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text
        variant={size === 'sm' ? 'caption' : 'bodySmall'}
        weight="medium"
        style={[styles.label, labelColorStyle]}
      >
        {content}
      </Text>
      {onClose && (
        <Pressable
          onPress={onClose}
          hitSlop={4}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${content}`}
        >
          <CircleX
            size={size === 'sm' ? theme.metrics.iconSize.xs : theme.metrics.iconSize.sm}
            color={
              closeIconColor ?? (isFilled ? theme.colors.icon.onBrand : theme.colors.icon.muted)
            }
            strokeWidth={2}
            absoluteStrokeWidth
          />
        </Pressable>
      )}
    </AnimatedPressable>
  );
}
