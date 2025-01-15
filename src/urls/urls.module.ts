import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { RedisService } from 'src/infra/services/redis/redis.service';

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, RedisService],
})
export class UrlsModule {}
