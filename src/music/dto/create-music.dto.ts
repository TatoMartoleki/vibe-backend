import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateMusicDto {
    @IsString()
    name: string;

    // @IsNumberString()
    // artistId?: number;

    // @IsNumberString()
    // duration?: number;
}
