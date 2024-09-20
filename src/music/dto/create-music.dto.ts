import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateMusicDto {
    @IsString()
    name: string;

    @IsNumber()
    artistId: number;

    @IsNumberString()
    duration?: number;
}
