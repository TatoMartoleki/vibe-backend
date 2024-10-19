import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
    
    @ApiProperty({ description: 'The name of the genre', example: 'Rock' })
    @IsString()
    name: string;
}
