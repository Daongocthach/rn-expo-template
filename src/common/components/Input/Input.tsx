import { Eye, EyeOff, X } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Text } from '@/common/components/Text';
import { UniTextInput } from '@/common/components/uni';
import { styles } from './Input.styles';
import type { InputProps } from './Input.types';

/**
 * A themed text input with optional label, icons, error/helper text, and password visibility toggle.
 *
 * @example
 * ```tsx
 * <Input label="Email" placeholder="you@example.com" error={errors.email} />
 * ```
 */
export function Input({
  label,
  required = false,
  error,
  helperText,
  disabled = false,
  size = 'md',
  leftIcon,
  rightIcon,
  secureTextEntry,
  readOnly = false,
  onPress,
  onClear,
  style,
  ...rest
}: InputProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = secureTextEntry !== undefined;
  const shouldObscure = isPassword && !passwordVisible;
  const isReadOnlyTrigger = readOnly && typeof onPress === 'function';
  let inputValue = '';
  if (rest.value !== undefined && rest.value !== null) {
    inputValue = String(rest.value);
  } else if (rest.defaultValue !== undefined && rest.defaultValue !== null) {
    inputValue = String(rest.defaultValue);
  }
  const showClearButton = !disabled && !readOnly && inputValue.length > 0;

  styles.useVariants({
    size,
    focused,
    error: !!error,
    disabled,
  });

  const passwordToggle = isPassword ? (
    <Pressable
      onPress={() => setPasswordVisible((prev) => !prev)}
      accessibilityRole="button"
      accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
      hitSlop={8}
    >
      {passwordVisible ? (
        <EyeOff size={20} color={theme.colors.icon.muted} strokeWidth={2} absoluteStrokeWidth />
      ) : (
        <Eye size={20} color={theme.colors.icon.muted} strokeWidth={2} absoluteStrokeWidth />
      )}
    </Pressable>
  ) : null;
  const trailingAction = isPassword ? passwordToggle : rightIcon;

  const clearButton = showClearButton ? (
    <Pressable
      onPress={() => {
        if (typeof onClear === 'function') {
          onClear();
          return;
        }

        rest.onChangeText?.('');
      }}
      accessibilityRole="button"
      accessibilityLabel={t('common.clear')}
      hitSlop={8}
    >
      <X size={20} color={theme.colors.icon.muted} strokeWidth={2} absoluteStrokeWidth />
    </Pressable>
  ) : null;

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
          {required && (
            <Text variant="label" style={styles.requiredMark}>
              {' '}
              *
            </Text>
          )}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <Pressable
          onPress={onPress}
          disabled={!isReadOnlyTrigger}
          accessibilityRole={isReadOnlyTrigger ? 'button' : undefined}
          accessibilityState={{ disabled }}
          style={styles.triggerArea}
        >
          {leftIcon}
          <UniTextInput
            style={[styles.input, style]}
            editable={!disabled && !readOnly}
            pointerEvents={isReadOnlyTrigger ? 'none' : 'auto'}
            secureTextEntry={shouldObscure}
            showSoftInputOnFocus={isReadOnlyTrigger ? false : rest.showSoftInputOnFocus}
            accessibilityLabel={label}
            accessibilityState={{ disabled }}
            onFocus={(e) => {
              setFocused(true);
              rest.onFocus?.(e);
              if (isReadOnlyTrigger) {
                onPress?.();
              }
            }}
            onBlur={(e) => {
              setFocused(false);
              rest.onBlur?.(e);
            }}
            uniProps={(unistylesTheme) => ({
              placeholderTextColor: unistylesTheme.colors.text.muted,
            })}
            {...rest}
            value={inputValue}
          />
        </Pressable>
        {(trailingAction || clearButton) && (
          <View style={styles.rightActions}>
            {trailingAction}
            {clearButton}
          </View>
        )}
      </View>
      {error && (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      )}
      {!error && helperText && (
        <Text variant="caption" style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
}
