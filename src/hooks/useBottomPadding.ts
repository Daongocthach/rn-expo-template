import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { vs } from '@/theme/metrics';

const TAB_BAR_HEIGHT = vs(48);
const ANDROID_EXTRA = vs(8);

export function useBottomPadding(tabBarAware = false) {
  const { bottom } = useSafeAreaInsets();
  const base = bottom + (tabBarAware ? TAB_BAR_HEIGHT : 0);

  return Platform.OS === 'android' && tabBarAware ? base + ANDROID_EXTRA : base;
}
