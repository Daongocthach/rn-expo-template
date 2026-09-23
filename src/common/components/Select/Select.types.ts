import type { ReactNode } from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { ComponentSize } from '@/common/components/shared.types';

type SelectTriggerVariant = 'plain';

/** Represents a single option within a {@link Select} dropdown. */
export interface SelectOption {
  /** Display text for this option. */
  label: string;
  /** Optional leading image displayed with this option. */
  iconSource?: ImageSourcePropType;
  /** Optional leading text badge displayed when no image is needed. */
  iconLabel?: string;
  /** Unique value associated with this option. */
  value: string;
  /** Whether this option is disabled. Defaults to `false`. */
  disabled?: boolean;
}

/** Props for the {@link Select} component. */
export interface SelectProps {
  /** The currently selected option value. */
  value: string;
  /** Callback fired with the new value when an option is selected. */
  onChange: (value: string) => void;
  /** Array of selectable options. */
  options: SelectOption[];
  /** Optional callback fired when the options list reaches the end. */
  onEndReached?: () => void;
  /** Whether more options are available for pagination. */
  hasMore?: boolean;
  /** Whether the next page is currently loading. */
  isLoadingMore?: boolean;
  /** Current search text displayed in the sheet search bar. */
  searchValue?: string;
  /** Callback fired when the search text changes. */
  onSearchChangeText?: (text: string) => void;
  /** Placeholder text for the search bar inside the sheet. */
  searchPlaceholder?: string;
  /** Whether the first page for the current search is loading. */
  isSearching?: boolean;
  /** Optional empty-state text when no options are available. */
  emptyText?: string;
  /** Placeholder text displayed when no option is selected. */
  placeholder?: string;
  /** Callback fired when the selected value is cleared. */
  onClear?: () => void;
  /** Label text displayed above the select trigger. */
  label?: string;
  /** Whether the field is required. Displays a red asterisk next to the label. */
  required?: boolean;
  /** Error message displayed below the select trigger. */
  error?: string;
  /** Whether the select is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** Whether the select is read-only. Keeps value visible but prevents changes. */
  readOnly?: boolean;
  /** Size variant controlling the select dimensions. Defaults to `'md'`. */
  size?: ComponentSize;
  /** Size of the optional leading image in the trigger and option rows. Defaults to `'sm'`. */
  optionImageSize?: ComponentSize;
  /** Optional bottom sheet snap points. Defaults to `['40%', '60%']`. */
  snapPoints?: Array<string | number>;
  /** Optional custom trigger content rendered instead of the default select UI. */
  children?: ReactNode;
  /** Visual style for the select trigger. Defaults to `'default'`. */
  triggerVariant?: SelectTriggerVariant;
  /** Whether to render using a Modal instead of AppBottomSheet (useful when Select is inside a BottomSheet). */
  useModal?: boolean;
  /** Accessibility label for the select trigger. */
  accessibilityLabel?: string;
}
