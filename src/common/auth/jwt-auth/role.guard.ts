import { ROLE_KEY } from '../../decorator/auth/role.decorator';
import { RequestUser } from '../../interface/auth.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../../generated/prisma/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<RequestUser>();

    if (user.role === Role.ADMIN) {
      return true;
    }

    return requiredRole.includes(user.role);
  }
}
