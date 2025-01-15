import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisCacheModule } from '../../database/redis.database';

@Global()
@Module({
  imports: [RedisCacheModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
