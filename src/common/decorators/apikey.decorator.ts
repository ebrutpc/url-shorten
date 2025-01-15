import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ApiKey = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.apiKey;
  },
);
