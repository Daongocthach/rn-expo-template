import type { ReactNode } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Text } from '@/common/components/Text';
import { useAnimatedPress } from '@/hooks/useAnimatedPress';
import { styles } from './Table.styles';
import type { TableCellAlign, TableColumn, TableProps } from './Table.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const DEFAULT_EMPTY_CELL = '--';
const ACTION_COLUMN_WIDTH = 56;

export function Table<T>({
  columns,
  data,
  keyExtractor,
  renderActions,
  onRowPress,
  emptyLabel,
  emptyState,
  scrollable = true,
  density = 'comfortable',
  bordered = true,
  minWidth,
  style,
  contentStyle,
  rowStyle,
  cellStyle,
  emptyCellPlaceholder = DEFAULT_EMPTY_CELL,
  accessibilityLabel = 'table',
  showHeader = true,
}: TableProps<T>) {
  styles.useVariants({
    density,
    bordered,
  });

  const hasRows = data.length > 0;
  const totalColumns = renderActions ? columns.length + 1 : columns.length;

  const tableWidth =
    minWidth ?? (scrollable ? calculateMinWidth(columns, Boolean(renderActions)) : undefined);

  const surface = (
    <View
      style={[styles.container, tableWidth ? { minWidth: tableWidth } : undefined, style]}
      accessibilityLabel={accessibilityLabel}
    >
      <View style={[styles.table, contentStyle]}>
        {showHeader && (
          <View style={styles.headerRow} accessibilityRole="header">
            {columns.map((column, index) => (
              <HeaderCell
                key={column.key}
                column={column}
                isLast={index === totalColumns - 1 && !renderActions}
                density={density}
                bordered={bordered}
              />
            ))}
            {renderActions && (
              <View
                style={[
                  styles.cell,
                  styles.headerCell,
                  styles.actionCell,
                  styles.rowLastCell,
                  { width: ACTION_COLUMN_WIDTH },
                ]}
              />
            )}
          </View>
        )}

        {hasRows ? (
          data.map((item, rowIndex) => {
            const key = keyExtractor(item, rowIndex);
            const rowContent = (
              <>
                {columns.map((column, columnIndex) => (
                  <BodyCell
                    key={column.key}
                    column={column}
                    item={item}
                    rowIndex={rowIndex}
                    emptyCellPlaceholder={emptyCellPlaceholder}
                    cellStyle={cellStyle}
                    isLast={columnIndex === totalColumns - 1 && !renderActions}
                    showHeader={showHeader}
                    density={density}
                    bordered={bordered}
                  />
                ))}
                {renderActions && (
                  <View
                    style={[
                      styles.cell,
                      styles.actionCell,
                      styles.rowLastCell,
                      cellStyle,
                      { width: ACTION_COLUMN_WIDTH },
                    ]}
                  >
                    {renderActions(item, rowIndex)}
                  </View>
                )}
              </>
            );

            const resolvedRowStyle =
              typeof rowStyle === 'function' ? rowStyle(item, rowIndex) : rowStyle;

            if (onRowPress) {
              return (
                <PressableRow
                  key={key}
                  onPress={() => onRowPress(item, rowIndex)}
                  style={resolvedRowStyle}
                  accessibilityLabel={`row-${key}`}
                >
                  {rowContent}
                </PressableRow>
              );
            }

            return (
              <View key={key} style={[styles.row, resolvedRowStyle]}>
                {rowContent}
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            {emptyState ??
              (emptyLabel ? (
                <Text variant="bodySmall" color="secondary" align="center">
                  {emptyLabel}
                </Text>
              ) : null)}
          </View>
        )}
      </View>
    </View>
  );

  if (!scrollable) {
    return surface;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {surface}
    </ScrollView>
  );
}

function PressableRow({
  onPress,
  children,
  style,
  accessibilityLabel,
}: {
  onPress: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel: string;
}) {
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress({ scale: 0.99 });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.row, animatedStyle, style]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </AnimatedPressable>
  );
}

function HeaderCell<T>({
  column,
  isLast,
  density,
  bordered,
}: {
  column: TableColumn<T>;
  isLast: boolean;
  density: 'compact' | 'comfortable' | 'spacious';
  bordered: boolean;
}) {
  styles.useVariants({
    density,
    bordered,
  });

  return (
    <View
      style={[
        styles.cell,
        styles.headerCell,
        alignStyle(column.headerAlign ?? column.align ?? 'left', true),
        isLast && styles.rowLastCell,
        column.width ? { width: column.width } : { flex: column.flex ?? 1 },
      ]}
    >
      <Text
        variant="label"
        weight="semibold"
        style={styles.headerText}
        align={column.headerAlign ?? column.align ?? 'left'}
      >
        {column.header}
      </Text>
    </View>
  );
}

function BodyCell<T>({
  column,
  item,
  rowIndex,
  emptyCellPlaceholder,
  cellStyle,
  isLast,
  showHeader = true,
  density,
  bordered,
}: {
  column: TableColumn<T>;
  item: T;
  rowIndex: number;
  emptyCellPlaceholder: ReactNode;
  cellStyle?: StyleProp<ViewStyle>;
  isLast: boolean;
  showHeader?: boolean;
  density: 'compact' | 'comfortable' | 'spacious';
  bordered: boolean;
}) {
  styles.useVariants({
    density,
    bordered,
  });

  const content = column.render(item, rowIndex);
  const resolvedContent = content ?? emptyCellPlaceholder;

  return (
    <View
      style={[
        styles.cell,
        alignStyle(column.align ?? 'left', false),
        isLast && styles.rowLastCell,
        rowIndex === 0 && !showHeader && styles.noBorderTop,
        cellStyle,
        column.width ? { width: column.width } : { flex: column.flex ?? 1 },
      ]}
    >
      {typeof resolvedContent === 'string' || typeof resolvedContent === 'number' ? (
        <Text variant="body" style={styles.cellText} align={column.align ?? 'left'}>
          {resolvedContent}
        </Text>
      ) : (
        resolvedContent
      )}
    </View>
  );
}

function alignStyle(align: TableCellAlign, isHeader: boolean) {
  if (align === 'center') {
    return isHeader ? styles.headerAlignCenter : styles.cellAlignCenter;
  }

  if (align === 'right') {
    return isHeader ? styles.headerAlignRight : styles.cellAlignRight;
  }

  return isHeader ? styles.headerAlignLeft : styles.cellAlignLeft;
}

function calculateMinWidth<T>(columns: Array<TableColumn<T>>, hasActions: boolean): number {
  const columnWidthTotal = columns.reduce((sum, column) => sum + (column.width ?? 120), 0);
  return columnWidthTotal + (hasActions ? ACTION_COLUMN_WIDTH : 0);
}
