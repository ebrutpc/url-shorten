import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import UrlDto from './dtos/generateShortUrl.dto';
import ShortURlDto from './dtos/redirectUrl.dto';
import { ApiKeyInterceptor } from '../common/interceptors/apiKey.interceptor';
import { ApiKey } from '../common/decorators/apikey.decorator';
import { BaseResponse } from '../base.response';
import { Response } from 'express';
import { Res } from '@nestjs/common';
@Controller('')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get('/:shortUrl')
  async redirectUrl(@Param() shortURlDto: ShortURlDto, @Res() res: Response) {
    const url = await this.urlsService.getUrlByShortUrl(shortURlDto.shortUrl);
    res.redirect(url);
  }

  @Post('')
  @UseInterceptors(ApiKeyInterceptor)
  async urlShorten(
    @Body() urlDto: UrlDto,
    @ApiKey() apiKey?: string,
  ): Promise<BaseResponse> {
    const key = await this.urlsService.generateShortUrl(urlDto.url, apiKey);
    return new BaseResponse(key);
  }
}
