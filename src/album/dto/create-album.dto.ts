import { IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The title of the album',
    example: 'Greatest Hits',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The release date of the album in YYYY-MM-DD format',
    example: '2024-10-17',
  })
  @IsString()
  releaseDate: string;

  @ApiProperty({
    description: 'The name of the artist',
    example: 'John Doe',
  })
  @IsString()
  artistName: string;
}
