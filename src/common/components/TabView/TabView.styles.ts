import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
    marginBottom: theme.metrics.spacingV.p16,
  },
  headerCopy: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p8,
    padding: theme.metrics.spacing.p4,
    marginBottom: theme.metrics.spacingV.p4,
    borderRadius: theme.metrics.borderRadius.lg,
    backgroundColor: theme.colors.background.surfaceAlt,
  },
  tabItem: {
    flex: 1,
    minHeight: theme.metrics.spacing.p40,
    paddingHorizontal: theme.metrics.spacing.p4,
    paddingVertical: theme.metrics.spacingV.p8,
    borderRadius: theme.metrics.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabItemActive: {
    backgroundColor: theme.colors.background.surface,
    shadowColor: theme.colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.colors.mode === 'dark' ? 0.25 : 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabItemLabel: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    fontFamily: theme.fonts.medium,
    fontWeight: '500',
    fontSize: theme.fonts.size.xs,
  },
  tabItemLabelActive: {
    color: theme.colors.mode === 'dark' ? theme.colors.brand.secondary : theme.colors.brand.primary,
    fontFamily: theme.fonts.bold,
    fontWeight: '700',
    fontSize: theme.fonts.size.xs,
  },
  tabBadge: {
    minWidth: theme.metrics.spacing.p20,
    height: theme.metrics.spacing.p20,
    marginTop: theme.metrics.spacingV.p4,
    paddingHorizontal: theme.metrics.spacing.p8,
    borderRadius: theme.metrics.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      theme.colors.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(15, 23, 42, 0.06)',
  },
  tabBadgeActive: {
    backgroundColor:
      theme.colors.mode === 'dark' ? theme.colors.brand.secondary : theme.colors.brand.primary,
  },
  tabBadgeText: {
    color: theme.colors.text.secondary,
  },
  tabBadgeTextActive: {
    color:
      theme.colors.mode === 'dark' ? theme.colors.background.surface : theme.colors.text.onBrand,
  },
  sceneContainer: {
    flex: 1,
  },
  tabView: {
    flex: 1,
  },
}));
