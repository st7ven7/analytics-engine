import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { App } from '../../database/entities/app.entity';

export const CurrentApp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): App => {
    const request = ctx.switchToHttp().getRequest();
    return request.app;
  },
);