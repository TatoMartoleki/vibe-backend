import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateMusicDto {
    @IsString()
    @ApiProperty({
        description: 'The name of the music track',
        example: 'Bohemian Rhapsody'
    })
    name: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the artist',
        example: 'Queen'
    })
    artistName: string;
}

