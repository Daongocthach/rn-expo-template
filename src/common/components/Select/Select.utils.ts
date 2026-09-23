import type { SelectOption } from './Select.types';

/**
 * Filters a static array of string items by search keyword and transforms them into {@link SelectOption} format.
 * Use this for finite, client-side arrays where all items are pre-loaded in memory.
 *
 * @example
 * ```ts
 * const options = filterStaticSelectOptions(productTypes, searchKeyword);
 * ```
 */
export function filterStaticSelectOptions(
  items: string[] = [],
  searchKeyword: string = ''
): SelectOption[] {
  const query = searchKeyword.trim().toLowerCase();
  const filtered = query ? items.filter((item) => item.toLowerCase().includes(query)) : items;

  return filtered.map((item) => ({
    label: item,
    value: item,
  }));
}

/**
 * Transforms a paginated or server-side array of items into {@link SelectOption} format.
 * Does not perform client-side filtering since search/pagination is handled server-side.
 *
 * @example
 * ```ts
 * const options = mapPaginatedSelectOptions(products, (p) => p.name, (p) => p.id);
 * ```
 */
export function mapPaginatedSelectOptions<T>(
  items: T[] = [],
  getLabel: (item: T) => string,
  getValue: (item: T) => string
): SelectOption[] {
  return items.map((item) => ({
    label: getLabel(item),
    value: getValue(item),
  }));
}
