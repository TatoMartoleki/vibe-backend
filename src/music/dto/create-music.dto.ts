import { IsNumber, IsString } from "class-validator";

export class CreateMusicDto {
    @IsString()
    name: string;

    @IsString()
    artistId: number;

    @IsNumber()
    duration: number;
}
