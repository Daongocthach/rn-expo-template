import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUnistyles } from 'react-native-unistyles';
import { Text } from '@/common/components/Text';
import { UniActivityIndicator } from '@/common/components/uni';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { styles } from './Button.styles';
import type { ButtonProps } from './Button.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function resolveButtonIcon(icon: ReactNode, variant: string, onBrandColor: string | undefined) {
  if (!isValidElement(icon)) {
    return icon;
  }

  if (variant !== 'primary') {
    return icon;
  }

  const iconElement = icon as ReactElement<{
    color?: string;
    variant?: string;
  }>;

  return cloneElement(iconElement, {
    color: onBrandColor,
    variant: iconElement.props.variant ?? 'onBrand',
  });
}

function getSpinnerColor(
  variant: string,
  theme: {
    colors: {
      text: { primary: string; secondary: string; onBrand: string };
      brand: { primary: string };
    };
  }
) {
  if (variant === 'primary') return theme.colors.text.onBrand;
  if (variant === 'secondary' || variant === 'outline' || variant === 'disabled') {
    return theme.colors.text.secondary;
  }
  return theme.colors.brand.primary;
}

/**
 * Pressable button with multiple variants, sizes, loading state, and optional icons.
 *
 * @example
 * ```tsx
 * <Button title="Submit" variant="primary" onPress={handleSubmit} />
 * <Button title="Loading" loading />
 * ```
 */
export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  labelStyle,
  style,
  ...rest
}: ButtonProps) {
  const { theme } = useUnistyles();
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();

  styles.useVariants({
    variant,
    size,
    fullWidth,
    disabled: disabled || loading,
  });

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle, style as object]}
      disabled={disabled || loading}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      {...rest}
    >
      {loading ? (
        <UniActivityIndicator
          uniProps={(unistylesTheme) => ({
            color: getSpinnerColor(variant, unistylesTheme),
          })}
        />
      ) : (
        <>
          {resolveButtonIcon(leftIcon, variant, theme.colors.icon.onBrand)}
          <Text style={[styles.label, labelStyle]}>{title}</Text>
          {resolveButtonIcon(rightIcon, variant, theme.colors.icon.onBrand)}
        </>
      )}
    </AnimatedPressable>
  );
}
