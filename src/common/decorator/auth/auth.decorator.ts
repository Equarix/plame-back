import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth/jwt-auth.guard';
import { ROLE_KEY } from './role.decorator';
import { RoleGuard } from '../../auth/jwt-auth/role.guard';
import { Role } from '../../../generated/prisma/enums';
export const Auth = (role?: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLE_KEY, role),
    UseGuards(JwtAuthGuard, RoleGuard),
  );
};
