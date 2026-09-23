import type { UiPermissions } from '@/features/auth/types/ui-permission.types';

export interface Role {
  id: number;
  name: string;
  permissions: UiPermissions;
}
