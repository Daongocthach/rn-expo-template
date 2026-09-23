import { View } from 'react-native';
import { Text } from '@/common/components/Text';
import { styles } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

function getDisplayCount(count: number | undefined, maxCount: number): string | undefined {
  if (count === undefined) return undefined;
  if (count > maxCount) return `${maxCount}+`;
  return `${count}`;
}

/**
 * Displays a small status indicator, count, or dot overlay on a child element.
 *
 * @example
 * ```tsx
 * <Badge count={5} colorScheme="error" />
 * <Badge label="2/5" variant="outline" />
 * <Badge label="CRITICAL" variant="subtle" colorScheme="warning" />
 * <Badge variant="dot"><Icon icon={Bell} /></Badge>
 * ```
 */
export function Badge({
  variant = 'solid',
  size = 'md',
  colorScheme,
  label,
  count,
  maxCount = 99,
  children,
}: BadgeProps) {
  const resolvedColorScheme = colorScheme ?? (variant === 'subtle' ? 'error' : 'primary');
  styles.useVariants({
    variant: variant === 'dot' ? undefined : variant,
    size,
    colorScheme: resolvedColorScheme,
  });

  if (variant === 'dot') {
    return (
      <View style={styles.dotWrapper}>
        {children}
        <View style={styles.dot} />
      </View>
    );
  }

  const displayCount = getDisplayCount(count, maxCount);
  const displayLabel = label?.trim();
  const displayText = displayLabel ?? displayCount;
  const isSolid = variant === 'solid';
  const usesStyledText = variant === 'outline' || variant === 'subtle';
  let textColor: 'onBrand' | 'primary' | undefined;

  if (isSolid) {
    textColor = 'onBrand';
  }

  return (
    <View style={styles.badge}>
      {displayText !== undefined && (
        <Text
          variant="caption"
          weight="semibold"
          color={textColor}
          style={[styles.badgeLabel, usesStyledText ? styles.badgeText : undefined]}
        >
          {displayText}
        </Text>
      )}
    </View>
  );
}
