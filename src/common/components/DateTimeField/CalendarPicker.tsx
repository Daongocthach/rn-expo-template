import { format, isSameDay, startOfDay } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import type { DateData } from 'react-native-calendars';
import { useUnistyles } from 'react-native-unistyles';
import { styles } from './CalendarPicker.styles';

interface CalendarPickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

interface CustomDayProps {
  date?: DateData;
  state?: string;
  onPress?: (date?: DateData) => void;
  isSelected: boolean;
  isToday: boolean;
}

type CalendarLocale = 'en' | 'vi' | 'zh-CN' | 'zh-TW';

const CALENDAR_LOCALES: Record<
  CalendarLocale,
  {
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
    today: string;
  }
> = {
  en: {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
  },
  vi: {
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthNamesShort: [
      'Th1',
      'Th2',
      'Th3',
      'Th4',
      'Th5',
      'Th6',
      'Th7',
      'Th8',
      'Th9',
      'Th10',
      'Th11',
      'Th12',
    ],
    dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay',
  },
  'zh-CN': {
    monthNames: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    monthNamesShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    today: '今天',
  },
  'zh-TW': {
    monthNames: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    monthNamesShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    today: '今天',
  },
};

function resolveCalendarLocale(language: string): CalendarLocale {
  if (language === 'vi' || language === 'zh-CN' || language === 'zh-TW') {
    return language;
  }

  return 'en';
}

function ensureCalendarLocale(locale: CalendarLocale) {
  LocaleConfig.locales[locale] = CALENDAR_LOCALES[locale];
  LocaleConfig.defaultLocale = locale;
}

const CustomDay = React.memo(
  ({ date, state, onPress, isSelected, isToday }: CustomDayProps) => {
    type DayVariant = 'selected' | 'normal' | 'outside';

    const resolveState = (): DayVariant => {
      if (isSelected) return 'selected';
      if (state === 'disabled') return 'outside';
      return 'normal';
    };

    styles.useVariants({ state: resolveState() });

    const handlePress = () => {
      if (date && onPress) {
        onPress(date);
      }
    };

    return (
      <Pressable
        onPress={handlePress}
        style={styles.pickerGridCell}
        accessibilityRole="button"
        accessibilityState={{ selected: isSelected }}
      >
        <View style={styles.pickerGridDayCircle}>
          <Text style={styles.pickerGridDayText}>{date?.day}</Text>
          {isToday && <View style={styles.todayDot} />}
        </View>
      </Pressable>
    );
  },
  (prev, next) =>
    prev.isSelected === next.isSelected &&
    prev.isToday === next.isToday &&
    prev.state === next.state &&
    prev.date?.dateString === next.date?.dateString
);

export function CalendarPicker({ selectedDate, onDateSelect }: CalendarPickerProps) {
  const { i18n } = useTranslation();
  const { theme } = useUnistyles();
  const calendarLocale = resolveCalendarLocale(i18n.language);

  ensureCalendarLocale(calendarLocale);

  const containerStyle = useMemo(
    () => [styles.modalContainer, { paddingTop: theme.metrics.spacingV.p8 }],
    [theme]
  );

  const selectedDateString = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate]);

  const handleDayPress = (day?: DateData) => {
    if (!day) return;
    const localDate = new Date(day.year, day.month - 1, day.day);
    onDateSelect(localDate);
  };

  const today = useMemo(() => startOfDay(new Date()), []);

  const renderDay = useMemo(() => {
    const DayRenderer = (props: { date?: DateData; state?: string }) => {
      const dateObj = props.date
        ? new Date(props.date.year, props.date.month - 1, props.date.day)
        : null;
      const isSelected = dateObj ? isSameDay(dateObj, selectedDate) : false;
      const isToday = dateObj ? isSameDay(dateObj, today) : false;

      return (
        <CustomDay
          date={props.date}
          state={props.state}
          onPress={handleDayPress}
          isSelected={isSelected}
          isToday={isToday}
        />
      );
    };
    return DayRenderer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, today]);

  return (
    <View style={containerStyle}>
      <Calendar
        key={calendarLocale}
        current={selectedDateString}
        onDayPress={handleDayPress}
        firstDay={1} // Monday
        enableSwipeMonths
        dayComponent={renderDay}
        theme={{
          backgroundColor: theme.colors.background.surface,
          calendarBackground: theme.colors.background.surface,
          textSectionTitleColor: theme.colors.text.secondary,
          selectedDayBackgroundColor: theme.colors.brand.primary,
          selectedDayTextColor: theme.colors.text.inverse,
          todayTextColor: theme.colors.brand.primary,
          dayTextColor: theme.colors.text.primary,
          textDisabledColor: theme.colors.text.tertiary,
          dotColor: theme.colors.brand.primary,
          selectedDotColor: theme.colors.text.inverse,
          arrowColor: theme.colors.brand.primary,
          monthTextColor: theme.colors.text.primary,
          textDayFontFamily: theme.fonts.medium,
          textMonthFontFamily: theme.fonts.bold,
          textDayHeaderFontFamily: theme.fonts.medium,
          textDayFontSize: theme.fonts.size.md,
          textMonthFontSize: theme.fonts.size.lg,
          textMonthFontWeight: '700',
          textDayHeaderFontSize: theme.fonts.size.sm,
          weekVerticalMargin: 6,
        }}
      />
    </View>
  );
}
