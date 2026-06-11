import { JwtPayload, RequestUser } from '../../interface/auth.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof JwtPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestUser>();

    const user = request.user;

    return data ? user?.[data] : user;
  },
);
