import { User, Shield, Briefcase, Building, CheckCircle2, XCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Avatar, Card, ListItem, ScreenContainer, Text } from '@/common/components';
import { useAuthStore } from '@/providers';

export default function AccountScreen() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const user = useAuthStore((state) => state.user);

  const userName = user?.full_name || user?.username || t('common.technician');
  const userSubtitle = user?.username || 'admin';
  const userInitials = userName.substring(0, 2).toUpperCase();
  const roleName = user?.role?.name || '—';
  const departmentName = user?.department?.name || '—';
  const companyName = user?.company?.name || '—';
  const isActive = user?.status ?? false;

  return (
    <ScreenContainer scrollable padded edges={['bottom']}>
      <View style={styles.container}>
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Avatar initials={userInitials} size="xl" accessibilityLabel={userName} />
            <View style={styles.profileInfo}>
              <Text variant="h2">{userName}</Text>
              <Text variant="bodySmall" color="secondary">
                {userSubtitle}
              </Text>
            </View>
          </View>
        </Card>

        <Card variant="filled" style={styles.detailsCard}>
          <ListItem
            title={t('account.fields.fullName')}
            subtitle={userName}
            left={<User size={22} color={theme.colors.icon.primary} />}
            divider
          />
          <ListItem
            title={t('account.fields.username')}
            subtitle={user?.username || '—'}
            left={<User size={22} color={theme.colors.icon.primary} />}
            divider
          />

          <ListItem
            title={t('account.fields.role')}
            subtitle={roleName}
            left={<Shield size={22} color={theme.colors.icon.primary} />}
            divider
          />
          <ListItem
            title={t('account.fields.department')}
            subtitle={departmentName}
            left={<Briefcase size={22} color={theme.colors.icon.primary} />}
            divider
          />
          <ListItem
            title={t('account.fields.company')}
            subtitle={companyName}
            left={<Building size={22} color={theme.colors.icon.primary} />}
            divider
          />
          <ListItem
            title={t('account.fields.status')}
            subtitle={
              isActive ? t('account.fields.statusActive') : t('account.fields.statusInactive')
            }
            left={
              isActive ? (
                <CheckCircle2 size={22} color={theme.colors.state.success} />
              ) : (
                <XCircle size={22} color={theme.colors.state.error} />
              )
            }
          />
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
  profileCard: {
    padding: theme.metrics.spacing.p20,
    borderRadius: theme.metrics.borderRadius.xl,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p16,
  },
  profileInfo: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  detailsCard: {
    borderRadius: theme.metrics.borderRadius.xl,
    overflow: 'hidden',
  },
}));
