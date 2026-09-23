import { format, isValid } from 'date-fns';
import { CalendarDays, Clock, X } from 'lucide-react-native';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Pressable, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { styles } from './DateTimeField.styles';
import type { DateTimeFieldProps, DateTimePickerSheetHandle } from './DateTimeField.types';
import { DateTimePickerSheet } from './DateTimePickerSheet';

export function DateTimeField({
  label,
  mode = 'date',
  value,
  onChange,
  onClear,
  placeholder,
  error,
  disabled = false,
  minuteInterval = 1,
  showSeconds = true,
  style,
}: DateTimeFieldProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const sheetRef = useRef<DateTimePickerSheetHandle>(null);

  const displayValue = useMemo(() => {
    if (!value || !isValid(value)) {
      return '';
    }

    if (mode === 'time') {
      return format(value, showSeconds ? 'HH:mm:ss' : 'HH:mm');
    }

    if (mode === 'datetime') {
      return format(value, 'yyyy-MM-dd HH:mm:ss');
    }

    return format(value, 'yyyy-MM-dd');
  }, [mode, showSeconds, value]);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      Keyboard.dismiss();
      sheetRef.current?.present();
    }
  }, [disabled]);

  const showClearButton = Boolean(onClear && displayValue && !disabled);

  const defaultPlaceholder = useMemo(() => {
    if (mode === 'time') {
      return t('common.selectTime');
    }
    if (mode === 'datetime') {
      return t('common.selectDateTime');
    }
    return t('common.selectDate');
  }, [mode, t]);

  const iconComponent = mode === 'time' ? Clock : CalendarDays;

  return (
    <View style={[styles.wrapper, style]}>
      {label ? (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      ) : null}

      <Pressable
        onPress={handleOpen}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder || defaultPlaceholder}
        accessibilityState={{ disabled }}
        style={({ pressed }) => [
          styles.trigger,
          disabled ? styles.triggerDisabled : null,
          pressed && !disabled ? styles.triggerPressed : null,
        ]}
      >
        <View style={styles.content}>
          <Icon icon={iconComponent} size={18} variant="muted" />
          <Text
            variant="body"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.valueText,
              displayValue ? styles.valueTextActive : styles.placeholderText,
            ]}
          >
            {displayValue || placeholder || defaultPlaceholder}
          </Text>
        </View>

        {showClearButton ? (
          <Pressable
            onPress={onClear}
            accessibilityRole="button"
            accessibilityLabel={t('common.clear')}
            hitSlop={8}
            style={styles.clearButton}
          >
            <X size={18} color={theme.colors.icon.muted} strokeWidth={2} />
          </Pressable>
        ) : null}
      </Pressable>

      {error ? (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      ) : null}

      <DateTimePickerSheet
        ref={sheetRef}
        mode={mode}
        value={value}
        onChange={onChange}
        minuteInterval={minuteInterval}
        showSeconds={showSeconds}
      />
    </View>
  );
}
