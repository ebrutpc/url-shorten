import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { Redis } from 'ioredis';

@Catch(Redis)
export class RedisException extends HttpException {
  constructor({
    message = 'Redis Connection Error' as string,
    httpStatus = HttpStatus.BAD_GATEWAY as HttpStatus,
    error,
  }) {
    super(message, httpStatus, error);
  }
}
