import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateMusicDto {
    @IsString()
    name: string;

    @IsString()
    artistName: string
}
