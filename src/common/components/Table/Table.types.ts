import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type TableCellAlign = 'left' | 'center' | 'right';

export interface TableColumn<T> {
  /** Stable column key. */
  key: string;
  /** Header content for the column. */
  header: ReactNode;
  /** Render function for a single cell. */
  render: (item: T, index: number) => ReactNode;
  /** Optional fixed width for the column. */
  width?: number;
  /** Optional flex value when the column should grow to fill space. Defaults to `1`. */
  flex?: number;
  /** Text alignment inside the cell. Defaults to `'left'`. */
  align?: TableCellAlign;
  /** Text alignment for the header cell. Defaults to `'left'`. */
  headerAlign?: TableCellAlign;
}

export interface TableProps<T> {
  /** Columns shown in the table. */
  columns: Array<TableColumn<T>>;
  /** Whether to show the header row. Defaults to `true`. */
  showHeader?: boolean;
  /** Row data. */
  data: T[];
  /** Stable key extractor for each row. */
  keyExtractor: (item: T, index: number) => string;
  /** Optional render function for a trailing action column. */
  renderActions?: (item: T, index: number) => ReactNode;
  /** Optional press handler for a row. When provided, rows become pressable. */
  onRowPress?: (item: T, index: number) => void;
  /** Optional label rendered when there is no data. */
  emptyLabel?: ReactNode;
  /** Optional content rendered under the table when there is no data. */
  emptyState?: ReactNode;
  /** Whether the table should allow horizontal scrolling. Defaults to `true`. */
  scrollable?: boolean;
  /** Density variant for the row sizing. Defaults to `'comfortable'`. */
  density?: 'compact' | 'comfortable' | 'spacious';
  /** Whether the table shows borders. Defaults to `true`. */
  bordered?: boolean;
  /** Minimum width for the table body. */
  minWidth?: number;
  /** Optional style for the outer container. */
  style?: StyleProp<ViewStyle>;
  /** Optional style for the internal table surface. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Optional style for each row. Can be a static style or a function of item and row index. */
  rowStyle?: StyleProp<ViewStyle> | ((item: T, index: number) => StyleProp<ViewStyle>);
  /** Optional style for each cell. */
  cellStyle?: StyleProp<ViewStyle>;
  /** Optional placeholder used when a cell renders no visible content. Defaults to `'--'`. */
  emptyCellPlaceholder?: ReactNode;
  /** Optional accessibility label for the table container. */
  accessibilityLabel?: string;
}
