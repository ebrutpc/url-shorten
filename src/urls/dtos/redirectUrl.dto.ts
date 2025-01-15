import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export default class ShortURlDto {
  //@IsUrl()
  @IsString()
  @IsNotEmpty()
  shortUrl: string;
}
