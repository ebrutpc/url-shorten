import { IsNotEmpty, IsString } from 'class-validator';

export default class ShortURlDto {
  @IsString()
  @IsNotEmpty()
  shortUrl: string;
}
