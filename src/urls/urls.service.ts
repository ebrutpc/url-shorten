import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { RedisService } from '../infra/services/redis/redis.service';
import { createHash } from 'crypto';

@Injectable()
export class UrlsService {
  constructor(private readonly redisService: RedisService) {}

  createHashAndEncoding(url: string) {
    const hash = createHash('md5').update(url).digest('base64');
    return hash.substring(1, 7);
  }
  async generateShortUrl(url: string, apikey?: string): Promise<string> {
    const key = apikey
      ? this.createHashAndEncoding(`${apikey + url}`)
      : this.createHashAndEncoding(url);
    const valueExist = await this.redisService.getValueByKey(key);
    if (!valueExist) {
      await this.redisService.setValueByKey(key, url);
    }
    return key;
  }
  catch(error: any) {
    throw new NotAcceptableException(error);
  }

  async getUrlByShortUrl(shortUrl: string): Promise<string> {
    const url = await this.redisService.getValueByKey(shortUrl);
    if (!url) {
      throw new NotFoundException('Url cannot found');
    }
    return url;
  }
}
