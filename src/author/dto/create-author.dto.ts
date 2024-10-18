import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'The first name of the author',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the author',
    required: false,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'The release date associated with the author',
    example: '2023-05-15',
  })
  @IsString()
  releaseDate: string;

  @ApiProperty({
    description: 'A brief biography of the author',
    example: 'John Doe is a renowned author known for his mystery novels.',
  })
  @IsString()
  biography: string;
}

