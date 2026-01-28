import { IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
    
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}
