import { Test, TestingModule } from '@nestjs/testing';
import { UrlsService } from './urls.service';
import { RedisService } from '../infra/services/redis/redis.service';

describe('UrlsService', () => {
  let urlsService: UrlsService;
  let redisService;

  const mockRedisService = () => ({
    getValueByKey: jest.fn(),
  });

  const mockapiKey = '6d75dc40-43fc-49e9-98a0-6074741a21a2';
  const mockurl = 'https://github.com/ebrutpc/url-shorten';
  const mockKey = 'ZdPO4J';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlsService,
        {
          provide: RedisService,
          useFactory: mockRedisService,
        },
      ],
    }).compile();

    urlsService = module.get<UrlsService>(UrlsService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(urlsService).toBeDefined();
  });

  describe('getUrlByShortUrl', () => {
    it('calls redisSerredisService.getValueByKey and return the url', async () => {
      redisService.getValueByKey.mockResolvedValue(
        'https://github.com/ebrutpc/url-shorten',
      );
      const url = await urlsService.getUrlByShortUrl('');
      expect(url).toEqual('https://github.com/ebrutpc/url-shorten');
    });
  });

  describe('generateShortUrl', () => {
    it('calls redisService.setValueByKey and return shorturl key ', async () => {
      const key = urlsService.createHashAndEncoding(`${mockapiKey + mockurl}`);
      const valueExist = redisService.getValueByKey.mockResolvedValue(null);
      if (!valueExist) {
        redisService.setValueByKey(key, mockurl);
      }
      expect(key).toEqual(mockKey);
    });
  });
});
