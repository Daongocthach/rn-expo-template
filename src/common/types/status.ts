import type { BadgeColorScheme } from '@/common/components';

export interface StatusVisualConfig {
  labelKey?: string;
  indicator: string;
  textColor?: string;
  badgeColorScheme: BadgeColorScheme;
}
