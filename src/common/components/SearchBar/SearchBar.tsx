import { CircleX, Search } from 'lucide-react-native';
import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { UniActivityIndicator, UniTextInput } from '@/common/components/uni';
import { styles } from './SearchBar.styles';
import type { SearchBarProps } from './SearchBar.types';

/**
 * A search input with a leading search icon, clear button, and optional loading indicator.
 *
 * @example
 * ```tsx
 * <SearchBar
 *   value={query}
 *   onChangeText={setQuery}
 *   placeholder="Search items..."
 *   onSubmit={handleSearch}
 * />
 * ```
 */
export function SearchBar({
  value,
  onChangeText,
  placeholder,
  onSubmit,
  onClear,
  loading = false,
  autoFocus = false,
  size = 'md',
}: SearchBarProps) {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  styles.useVariants({ size, focused });

  const handleClear = () => {
    onChangeText('');
    onClear?.();
  };

  return (
    <View style={styles.container}>
      <Search
        size={theme.metrics.iconSize.md}
        color={theme.colors.icon.muted}
        strokeWidth={2}
        absoluteStrokeWidth
      />
      <UniTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={autoFocus}
        autoCorrect={false}
        accessibilityLabel={placeholder ?? 'Search'}
        uniProps={(unistylesTheme) => ({
          placeholderTextColor: unistylesTheme.colors.text.muted,
        })}
      />
      {loading ? (
        <UniActivityIndicator
          size="small"
          uniProps={(unistylesTheme) => ({ color: unistylesTheme.colors.text.muted })}
        />
      ) : (
        value.length > 0 && (
          <Pressable
            onPress={handleClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <CircleX
              size={theme.metrics.iconSize.md}
              color={theme.colors.icon.muted}
              strokeWidth={2}
              absoluteStrokeWidth
            />
          </Pressable>
        )
      )}
    </View>
  );
}
