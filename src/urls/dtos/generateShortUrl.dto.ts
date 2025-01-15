import { IsUrl } from 'class-validator';

export default class UrlDto {
  @IsUrl()
  url: string;
}
