import { SetMetadata } from '@nestjs/common';
import { Roles as allRoles, PermissionsTypes } from '../constants/role.enum';
//public route decorator
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
// roles decorator
export const ROLES_KEY = 'roles';
export const Roles = (...roles: allRoles[]) => SetMetadata(ROLES_KEY, roles);
//permissions
export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: PermissionsTypes[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
