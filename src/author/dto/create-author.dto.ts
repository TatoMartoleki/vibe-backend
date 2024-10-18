import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  releaseDate: string

  @IsString()
  biography: string;
}
