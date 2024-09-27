import { IsArray, IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  // @IsArray()
  // @IsString({ each: true })
  // musics: string[];

  @IsString()
  biography: string;
}
