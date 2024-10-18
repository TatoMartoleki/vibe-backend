import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlaylistDto {
    
    @ApiProperty({ description: 'The name of the playlist', example: 'Chill Vibes' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'A brief description of the playlist', example: 'A collection of relaxing tunes', required: false })
    @IsString()
    @IsOptional()
    description: string;
}
