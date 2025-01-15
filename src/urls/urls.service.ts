import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from '../infra/services/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UrlsService {
  constructor(private readonly redisService: RedisService) {}

  async generateShortUrl(url: string, apikey?: string): Promise<string> {
    const id = apikey ? apikey : uuidv4();
    const key = id.substring(0, 7);
    await this.redisService.setValueByKey(key, url);
    return key;
  }

  async getUrlByShortUrl(shortUrl: string): Promise<string> {
    const url = await this.redisService.getValueByKey(shortUrl);
    if (!url) {
      throw new NotFoundException('Url cannot found');
    }
    return url;
  }
}
