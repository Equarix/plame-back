import { Request } from 'express';
import { Role } from '../../generated/prisma/enums';

export interface JwtPayload {
  userId: number;
  role: Role;
  iat: number;
}

export interface RequestUser extends Request {
  user: JwtPayload;
}
