import { Info } from 'lucide-react-native';
import { Platform, View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Card, DetailRow, ScreenContainer, Text } from '@/common/components';
import { env } from '@/config/env';
import { APP_NAME, RUNTIME_VERSION, VERSION } from '@/utils';

export default function VersionsScreen() {
  const { theme } = useUnistyles();

  return (
    <ScreenContainer scrollable padded edges={['bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={[styles.iconCircle, { backgroundColor: theme.colors.background.surfaceAlt }]}
          >
            <Info size={32} color={theme.colors.brand.primary} />
          </View>
          <Text variant="h2" weight="bold">
            {APP_NAME}
          </Text>
          <Text variant="bodySmall" color="secondary">
            {`v${VERSION}`}
          </Text>
        </View>

        <Card variant="filled" style={styles.card}>
          <DetailRow label="App Name" value={APP_NAME} />
          <DetailRow label="Version" value={VERSION} />
          <DetailRow label="Runtime" value={RUNTIME_VERSION} />
          <DetailRow label="Environment" value={env.appEnv} />
          <DetailRow label="Platform" value={`${Platform.OS} ${Platform.Version}`} />
          <DetailRow label="Expo SDK" value="57.0.0" />
          <DetailRow label="React Native" value="0.86.3" />
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.metrics.spacingV.p20,
    paddingTop: theme.metrics.spacingV.p12,
  },
  header: {
    alignItems: 'center',
    gap: theme.metrics.spacingV.p8,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.metrics.spacingV.p4,
  },
  card: {
    padding: theme.metrics.spacing.p16,
    borderRadius: theme.metrics.borderRadius.xl,
    gap: theme.metrics.spacingV.p12,
  },
}));
