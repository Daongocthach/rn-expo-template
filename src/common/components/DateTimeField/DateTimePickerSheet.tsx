import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider } from '../Divider';
import { CalendarPicker } from './CalendarPicker';
import type { DateTimeFieldMode, DateTimePickerSheetHandle } from './DateTimeField.types';
import { styles } from './DateTimePickerSheet.styles';
import { TimePicker } from './TimePicker';

interface DateTimePickerSheetProps {
  mode: DateTimeFieldMode;
  value?: Date;
  onChange: (date: Date) => void;
  minuteInterval?: number;
  showSeconds?: boolean;
}

export const DateTimePickerSheet = forwardRef<DateTimePickerSheetHandle, DateTimePickerSheetProps>(
  ({ mode, value, onChange, minuteInterval = 1, showSeconds = true }, ref) => {
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    // Sync internal state with external value or fallback to today
    const [tempDate, setTempDate] = useState(() => value ?? new Date());

    useEffect(() => {
      if (value) {
        setTempDate(value);
      }
    }, [value]);

    const snapPoints = useMemo(() => {
      if (mode === 'time') {
        return ['50%'];
      }
      if (mode === 'datetime') {
        return ['90%'];
      }
      return ['70%'];
    }, [mode]);

    const handleDateSelect = useCallback(
      (date: Date) => {
        const updatedDate = new Date(tempDate);
        updatedDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
        setTempDate(updatedDate);
        onChange(updatedDate);

        if (mode === 'date') {
          bottomSheetRef.current?.dismiss();
        }
      },
      [tempDate, onChange, mode]
    );

    const handleTimeSelect = useCallback(
      (time: { hour: number; minute: number; second: number }) => {
        const updatedDate = new Date(tempDate);
        updatedDate.setHours(time.hour, time.minute, time.second, 0);
        setTempDate(updatedDate);
        onChange(updatedDate);
      },
      [tempDate, onChange]
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      []
    );

    useImperativeHandle(
      ref,
      () => ({
        present: () => bottomSheetRef.current?.present(),
        dismiss: () => bottomSheetRef.current?.dismiss(),
      }),
      []
    );

    const renderContent = () => {
      if (mode === 'time') {
        return (
          <BottomSheetView style={styles.sheetContent}>
            <TimePicker
              value={{
                hour: tempDate.getHours(),
                minute: tempDate.getMinutes(),
                second: tempDate.getSeconds(),
              }}
              onChange={handleTimeSelect}
              minuteInterval={minuteInterval}
              showSeconds={showSeconds}
            />
          </BottomSheetView>
        );
      }

      if (mode === 'datetime') {
        return (
          <BottomSheetView style={styles.sheetContent}>
            <CalendarPicker selectedDate={tempDate} onDateSelect={handleDateSelect} />
            <View style={styles.divider}>
              <Divider />
            </View>
            <TimePicker
              value={{
                hour: tempDate.getHours(),
                minute: tempDate.getMinutes(),
                second: tempDate.getSeconds(),
              }}
              onChange={handleTimeSelect}
              minuteInterval={minuteInterval}
              showSeconds={showSeconds}
            />
          </BottomSheetView>
        );
      }

      return (
        <BottomSheetView style={styles.sheetContent}>
          <CalendarPicker selectedDate={tempDate} onDateSelect={handleDateSelect} />
        </BottomSheetView>
      );
    };

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        topInset={insets.top}
        enableDynamicSizing={false}
      >
        {renderContent()}
      </BottomSheetModal>
    );
  }
);

DateTimePickerSheet.displayName = 'DateTimePickerSheet';
