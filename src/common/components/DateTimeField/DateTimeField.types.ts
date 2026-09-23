import type { StyleProp, ViewStyle } from 'react-native';

export type DateTimeFieldMode = 'date' | 'time' | 'datetime';

export interface DateTimeFieldProps {
  label?: string;
  mode?: DateTimeFieldMode;
  value?: Date;
  onChange: (date: Date) => void;
  onClear?: () => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minuteInterval?: number;
  showSeconds?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface DateTimePickerSheetHandle {
  present: () => void;
  dismiss: () => void;
}
