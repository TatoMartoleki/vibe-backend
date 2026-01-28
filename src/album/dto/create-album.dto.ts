import { IsString, } from 'class-validator';

export class CreateAlbumDto {

  @IsString()
  title: string;


  @IsString()
  releaseDate: string;


  @IsString()
  artistName: string;
}
