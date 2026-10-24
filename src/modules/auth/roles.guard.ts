import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsTypes, Roles } from '../../constants/role.enum';
import {
  IS_PUBLIC_KEY,
  PERMISSION_KEY,
  ROLES_KEY,
} from '../../decorators/decorators.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no specific role is required, allow any authenticated user
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRole = String(user.role || '').toLowerCase();
    const hasRequiredRole = requiredRoles.some((role) => {
      const targetRole = String(role).toLowerCase();
      return userRole === targetRole || userRole.includes(targetRole);
    });

    return hasRequiredRole;
  }
}
