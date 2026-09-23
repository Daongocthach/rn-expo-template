import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Keyboard, Pressable, View } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { AppImage } from '@/common/components/AppImage';
import { Icon } from '@/common/components/Icon';
import { SafeAreaModal } from '@/common/components/SafeAreaModal';
import { SearchBar } from '@/common/components/SearchBar';
import { Text } from '@/common/components/Text';
import { UniActivityIndicator } from '@/common/components/uni';
import { useAppBottomSheet } from '@/providers/bottom-sheet';
import { styles } from './Select.styles';
import type { SelectOption, SelectProps } from './Select.types';

/**
 * A select dropdown using a bottom sheet modal to display options.
 *
 * @example
 * ```tsx
 * <Select
 *   value={country}
 *   onChange={setCountry}
 *   options={[
 *     { label: 'Egypt', value: 'eg' },
 *     { label: 'USA', value: 'us' },
 *   ]}
 *   placeholder="Choose a country"
 *   label="Country"
 * />
 * ```
 */
export function Select({
  value,
  onChange,
  options,
  onEndReached,
  hasMore = false,
  isLoadingMore = false,
  searchValue,
  onSearchChangeText,
  searchPlaceholder,
  isSearching = false,
  emptyText,
  placeholder,
  onClear,
  label,
  required = false,
  error,
  disabled = false,
  readOnly = false,
  size = 'md',
  optionImageSize = 'sm',
  snapPoints,
  children,
  triggerVariant,
  useModal = false,
  accessibilityLabel,
}: SelectProps) {
  const resolvedSnapPoints = useMemo(() => snapPoints ?? ['60%', '100%'], [snapPoints]);
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const { openSheet, closeSheet } = useAppBottomSheet();
  const isInteractionDisabled = disabled || readOnly;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [sheetSearchValue, setSheetSearchValue] = useState(searchValue ?? '');

  styles.useVariants({ size, optionImageSize, error: !!error, disabled, triggerVariant });

  const selectedOption = options.find(
    (o) =>
      o.value === value ||
      (value !== null && value !== undefined && String(o.value) === String(value))
  );
  const displayText = selectedOption?.label ?? placeholder ?? '';
  const shouldShowSearch = typeof onSearchChangeText === 'function';
  const shouldShowClear = Boolean(onClear && selectedOption && !isInteractionDisabled);

  const handleOpen = useCallback(() => {
    if (!isInteractionDisabled) {
      Keyboard.dismiss();
      setSheetSearchValue(searchValue ?? '');
      setIsSheetOpen(true);
    }
  }, [isInteractionDisabled, searchValue]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
      setIsSheetOpen(false);
      closeSheet();
    },
    [closeSheet, onChange]
  );

  const handleDismiss = useCallback(() => {
    setIsSheetOpen(false);
  }, []);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <UniActivityIndicator
          size="small"
          uniProps={(unistylesTheme) => ({
            color: unistylesTheme.colors.brand.primary,
          })}
        />
      </View>
    );
  }, [isLoadingMore]);

  const renderEmpty = useCallback(() => {
    if (!emptyText || isSearching) {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text variant="body" style={styles.emptyText}>
          {emptyText}
        </Text>
      </View>
    );
  }, [emptyText, isSearching]);

  const handleEndReached = useCallback(() => {
    if (hasMore && !isLoadingMore) {
      onEndReached?.();
    }
  }, [hasMore, isLoadingMore, onEndReached]);

  const renderLeadingIcon = useCallback((item: SelectOption) => {
    if (item.iconSource) {
      return <AppImage source={item.iconSource} style={styles.optionIcon} contentFit="contain" />;
    }

    if (item.iconLabel) {
      return (
        <View style={styles.optionBadge}>
          <Text variant="caption" weight="semibold" style={styles.optionBadgeText}>
            {item.iconLabel}
          </Text>
        </View>
      );
    }

    return null;
  }, []);

  const renderItem: ListRenderItem<SelectOption> = useCallback(
    ({ item }) => {
      const isSelected =
        item.value === value ||
        (value !== null && value !== undefined && String(item.value) === String(value));

      return (
        <Pressable
          onPress={() => handleSelect(item.value)}
          disabled={item.disabled || readOnly}
          style={[styles.option, isSelected && styles.optionSelected]}
          accessibilityRole="radio"
          accessibilityState={{
            selected: isSelected,
            disabled: item.disabled || readOnly,
          }}
        >
          <View style={styles.optionContent}>
            {renderLeadingIcon(item)}
            <Text
              variant="body"
              style={[styles.optionText, isSelected && styles.optionTextSelected]}
            >
              {item.label}
            </Text>
          </View>
          {isSelected ? <Icon icon={Check} sizeVariant="lg" variant="primary" /> : null}
        </Pressable>
      );
    },
    [handleSelect, readOnly, renderLeadingIcon, value]
  );

  const sheetContent = useMemo(
    () => (
      <SelectSheetContent
        options={options}
        renderItem={renderItem}
        renderFooter={renderFooter}
        renderEmpty={renderEmpty}
        handleEndReached={handleEndReached}
        shouldShowSearch={shouldShowSearch}
        searchPlaceholder={searchPlaceholder}
        isSearching={isSearching}
        onSearchChangeText={onSearchChangeText}
        initialSearchValue={sheetSearchValue}
        useModal={useModal}
      />
    ),
    [
      handleEndReached,
      isSearching,
      onSearchChangeText,
      options,
      renderEmpty,
      renderFooter,
      renderItem,
      searchPlaceholder,
      sheetSearchValue,
      shouldShowSearch,
      useModal,
    ]
  );

  useEffect(() => {
    if (!isSheetOpen || useModal) {
      return;
    }

    openSheet(sheetContent, {
      snapPoints: resolvedSnapPoints,
      enablePanDownToClose: true,
      showCloseButton: false,
      containerVariant: 'none',
      onDismiss: handleDismiss,
    });
  }, [handleDismiss, isSheetOpen, openSheet, resolvedSnapPoints, sheetContent, useModal]);

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
      <Pressable
        onPress={handleOpen}
        disabled={isInteractionDisabled}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: isSheetOpen, disabled: isInteractionDisabled }}
        accessibilityLabel={accessibilityLabel ?? displayText}
        style={styles.trigger}
      >
        {children ? (
          <View pointerEvents="none">{children}</View>
        ) : (
          <>
            <View style={styles.triggerContent}>
              {selectedOption ? renderLeadingIcon(selectedOption) : null}
              <Text
                variant="body"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={selectedOption ? styles.selectedText : styles.placeholderText}
              >
                {displayText}
              </Text>
            </View>
            {shouldShowClear ? (
              <Pressable
                onPress={onClear}
                accessibilityRole="button"
                accessibilityLabel={t('common.clear')}
                hitSlop={8}
              >
                <X size={18} color={theme.colors.icon.muted} strokeWidth={2} absoluteStrokeWidth />
              </Pressable>
            ) : null}
            <Icon icon={ChevronDown} sizeVariant="md" variant="muted" />
          </>
        )}
      </Pressable>
      {error && (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      )}

      {useModal ? (
        <SafeAreaModal
          visible={isSheetOpen}
          onDismiss={handleDismiss}
          title={label || placeholder || undefined}
        >
          {sheetContent}
        </SafeAreaModal>
      ) : null}
    </View>
  );
}

interface SelectSheetContentProps {
  options: SelectOption[];
  renderItem: ListRenderItem<SelectOption>;
  renderFooter: () => ReactNode;
  renderEmpty: () => ReactNode;
  handleEndReached: () => void;
  shouldShowSearch: boolean;
  searchPlaceholder?: string;
  isSearching: boolean;
  initialSearchValue?: string;
  onSearchChangeText?: (text: string) => void;
  useModal?: boolean;
}

function SelectSheetContent({
  options,
  renderItem,
  renderFooter,
  renderEmpty,
  handleEndReached,
  shouldShowSearch,
  searchPlaceholder,
  isSearching,
  initialSearchValue,
  onSearchChangeText,
  useModal = false,
}: SelectSheetContentProps) {
  const [draftSearchValue, setDraftSearchValue] = useState(initialSearchValue ?? '');

  const handleSearchChangeText = useCallback(
    (text: string) => {
      setDraftSearchValue(text);
      onSearchChangeText?.(text);
    },
    [onSearchChangeText]
  );

  const handleClear = useCallback(() => {
    setDraftSearchValue('');
    onSearchChangeText?.('');
  }, [onSearchChangeText]);

  return (
    <View style={styles.sheetContent}>
      {shouldShowSearch ? (
        <View style={styles.searchContainer}>
          <SearchBar
            value={draftSearchValue}
            onChangeText={handleSearchChangeText}
            placeholder={searchPlaceholder}
            loading={isSearching}
            onClear={handleClear}
          />
        </View>
      ) : null}
      {useModal ? (
        <FlatList
          style={styles.optionsList}
          data={options}
          keyExtractor={(item: SelectOption) => item.value}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            shouldShowSearch && styles.listContentWithSearch,
          ]}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <BottomSheetFlatList
          style={styles.optionsList}
          data={options}
          keyExtractor={(item: SelectOption) => item.value}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContent,
            shouldShowSearch && styles.listContentWithSearch,
          ]}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
        />
      )}
    </View>
  );
}
