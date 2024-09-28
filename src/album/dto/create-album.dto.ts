import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsString()
  releaseDate: string;

  @IsString()
  artistName: string

  @Type(() => Number)
  @IsNumber()
  artistId: number;


}

