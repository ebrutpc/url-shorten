import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

export const RedisCacheModule = RedisModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    type: 'single',
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<string>('REDIS_PORT'),
    options: { maxRetriesPerRequest: null },
    reconnectOnError: true,
    connectTimeout: 60 * 60 * 60,
  }),
});
