import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Chip } from '../Chip';
import { Text } from '../Text';

export interface FilterChipOption {
  label: string;
  value: string;
}

export interface FilterChipGroupProps {
  label: string;
  chips: FilterChipOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}

export function FilterChipGroup({
  label,
  chips,
  value,
  onChange,
  size = 'sm',
}: FilterChipGroupProps) {
  return (
    <View style={styles.container}>
      <Text variant="label" style={styles.label}>
        {label}
      </Text>
      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <Chip
            key={chip.value}
            label={chip.label}
            selected={value === chip.value}
            onPress={() => onChange(chip.value)}
            size={size}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.metrics.spacingV.p4,
  },
  label: {
    color: theme.colors.text.secondary,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.metrics.spacing.p8,
  },
}));
