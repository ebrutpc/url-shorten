import { prefix } from './common/constants/redis.contant';
export class BaseResponse {
  shortUrl: string;
  constructor(key: string) {
    this.shortUrl = `${prefix + key}`;
  }
}
