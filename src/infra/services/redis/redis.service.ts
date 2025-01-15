import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { RedisException } from '../../../common/custom-http-exception/redis-exception.filter';
import { ttl } from '../../../common/constants/redis.contant';
@Injectable()
export class RedisService extends Redis {
  constructor(@InjectRedis() private readonly redis: Redis) {
    super(redis.options);
  }

  async setValueByKey(key: string, value: string | number): Promise<string> {
    try {
      return this.set(key, value, 'EX', ttl);
    } catch (error: any) {
      throw new RedisException({
        message: 'Cannot set the key value',
        httpStatus: HttpStatus.AMBIGUOUS,
        error,
      });
    }
  }

  async getValueByKey(key: string): Promise<string | null> {
    try {
      return this.redis.get(key);
    } catch (error: any) {
      throw new RedisException({
        message: 'Cannot get the value by key',
        httpStatus: HttpStatus.AMBIGUOUS,
        error,
      });
    }
  }

  async deleteKey(key: string): Promise<number | null> {
    try {
      return this.redis.del(key);
    } catch (error: any) {
      throw new RedisException({
        message: 'Cannot delete the value by key',
        httpStatus: HttpStatus.AMBIGUOUS,
        error,
      });
    }
  }
}
