import type { Role } from '../types';

export function getRoleId(role: Role | number | undefined): number | undefined {
  return typeof role === 'number' ? role : role?.id;
}
