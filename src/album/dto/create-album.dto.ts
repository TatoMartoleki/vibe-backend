import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsString()
  releaseDate: string;

  @IsArray()
  @IsUrl({}, { each: true })
  musics: string[];

  @IsNumber()
  artistId: number;
}
