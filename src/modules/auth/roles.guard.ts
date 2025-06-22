import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PermissionsTypes,
  ResourcesTypes,
  Roles,
} from '../../constants/role.enum';
import {
  IS_PUBLIC_KEY,
  PERMISSION_KEY,
  RESOURCES_KEY,
  ROLES_KEY,
} from '../../decorators/decorators.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return false;
    }

    const requiredResources = this.reflector.getAllAndOverride<
      ResourcesTypes[]
    >(RESOURCES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredResources) {
      return false;
    }
    if (requiredResources.includes(ResourcesTypes.NOT_RESOURCES)) {
      return true;
    }
    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionsTypes[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredPermissions) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role || !user.acl) {
      return false;
    }

    const hasRequiredRole = requiredRoles.some((role) =>
      user.role.includes(role),
    );
    if (!hasRequiredRole) {
      return false;
    }

    const hasRequiredResource = requiredResources.every((resource: any) =>
      user.acl.some((aclEntry: any) => aclEntry.resource.slug === resource),
    );
    if (!hasRequiredResource) {
      return false;
    }

    const hasRequiredPermission = requiredPermissions.every(
      (permission: any) => {
        const permissionCheck = user.acl.some(
          (aclEntry: any) =>
            requiredResources.includes(aclEntry.resource.slug) &&
            aclEntry[permission] == true,
        );
        return permissionCheck;
      },
    );

    if (!hasRequiredPermission) {
      return false;
    }

    return true;
  }
}
