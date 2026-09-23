import { User } from 'lucide-react-native';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { AppImage } from '@/common/components/AppImage';
import { Text } from '@/common/components/Text';
import { styles } from './Avatar.styles';
import { AVATAR_SIZES } from './Avatar.types';
import type { AvatarProps } from './Avatar.types';

/**
 * Displays a user avatar as an image, initials, custom icon, or default person icon.
 *
 * @example
 * ```tsx
 * <Avatar source={{ uri: 'https://example.com/photo.jpg' }} size="lg" />
 * <Avatar initials="JD" size="md" />
 * ```
 */
export function Avatar({
  source,
  initials,
  icon,
  size = 'md',
  contentFit = 'cover',
  padding,
  accessibilityLabel,
}: AvatarProps) {
  const { theme } = useUnistyles();
  const dimension = AVATAR_SIZES[size];
  const fontSize = dimension * 0.4;

  styles.useVariants({ size });

  const containerStyle = [styles.container, padding !== undefined && { padding }];

  if (source) {
    return (
      <View style={containerStyle}>
        <AppImage
          source={source}
          style={styles.image}
          contentFit={contentFit}
          accessibilityRole="image"
          accessibilityLabel={accessibilityLabel}
        />
      </View>
    );
  }

  if (initials) {
    return (
      <View
        style={styles.container}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
      >
        <Text weight="semibold" style={[styles.initials, { fontSize }]}>
          {initials.slice(0, 2).toUpperCase()}
        </Text>
      </View>
    );
  }

  if (icon) {
    return (
      <View
        style={styles.container}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel}
      >
        {icon}
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? 'User avatar'}
    >
      <User
        size={dimension * 0.5}
        color={theme.colors.icon.onBrand}
        strokeWidth={2}
        absoluteStrokeWidth
      />
    </View>
  );
}
