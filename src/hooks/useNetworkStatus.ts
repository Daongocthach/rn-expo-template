import NetInfo from '@react-native-community/netinfo';
import { useEffect, useRef } from 'react';
import i18n from '@/i18n/config';
import { appAlert } from '@/providers';

export function useNetworkStatus() {
  const wasOffline = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOffline = !(state.isConnected && state.isInternetReachable !== false);

      if (isOffline && !wasOffline.current) {
        wasOffline.current = true;
        appAlert.alert(i18n.t('network.offline'), i18n.t('network.offlineMessage'));
      } else if (!isOffline && wasOffline.current) {
        wasOffline.current = false;
        appAlert.alert(i18n.t('network.online'), i18n.t('network.onlineMessage'));
      }
    });

    return () => unsubscribe();
  }, []);
}
