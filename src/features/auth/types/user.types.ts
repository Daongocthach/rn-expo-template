import type { Role } from './role.types';
import type { UiPermissions } from './ui-permission.types';

export interface Company {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface AuthUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: Role;
  avatar: string | null;
  full_name: string;
  status: boolean;
  department?: Department | null;
  level?: number;
  is_leader?: boolean;
  is_switch_company?: boolean;
  company?: Company | null;
  locations?: string[];
  signature?: string | null;
  ui_permissions?: UiPermissions;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
}

export interface LoginApiData extends AuthUser, AuthSession {}

export interface AuthResult {
  user: AuthUser;
  session: AuthSession;
}
