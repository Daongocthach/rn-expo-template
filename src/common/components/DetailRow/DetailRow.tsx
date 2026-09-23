import { isValidElement } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { styles } from './DetailRow.styles';
import type { DetailRowProps } from './DetailRow.types';

export function DetailRow({
  label,
  value,
  badge,
  isLast: _isLast = false,
  hasDivider = false,
  style,
  labelStyle,
  valueStyle,
}: DetailRowProps) {
  const showDivider = hasDivider;
  const content = badge ?? value;

  return (
    <View style={[styles.detailRow, showDivider && styles.hasDivider, style]}>
      <Text variant="bodySmall" color="secondary" style={[styles.detailLabel, labelStyle]}>
        {label}
      </Text>
      {isValidElement(content) ? (
        <View style={styles.valueContainer}>{content}</View>
      ) : (
        <Text variant="bodySmall" weight="semibold" style={[styles.detailValue, valueStyle]}>
          {content !== null && content !== undefined && content !== '' ? String(content) : '--'}
        </Text>
      )}
    </View>
  );
}
