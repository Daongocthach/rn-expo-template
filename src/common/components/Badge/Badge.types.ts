/** Visual style variant for the Badge component. */
export type BadgeVariant = 'solid' | 'outline' | 'subtle' | 'dot';

/** Size options for the Badge component. */
export type BadgeSize = 'sm' | 'md';

/** Color scheme options supported by the Badge component. */
export type BadgeColorScheme = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

/** Props for the {@link Badge} component. */
export interface BadgeProps {
  /** Visual style of the badge. Defaults to `'solid'`. */
  variant?: BadgeVariant;
  /** Size of the badge. Defaults to `'md'`. */
  size?: BadgeSize;
  /** Color scheme applied to the badge. Defaults to `'primary'`. */
  colorScheme?: BadgeColorScheme;
  /** Optional text label to display inside the badge. */
  label?: string;
  /** Numeric value to display inside the badge. */
  count?: number;
  /** Maximum count to display before showing `{maxCount}+`. Defaults to `99`. */
  maxCount?: number;
  /** Child element wrapped by the badge when using the `'dot'` variant. */
  children?: React.ReactNode;
}
