import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFileDto {

    @ApiProperty({ description: 'The unique identifier for the file', example: 1 })
    @IsNumber()
    id: number;

    @ApiProperty({ description: 'The URL of the file', example: 'https://example.com/file.jpg' })
    @IsString()
    url: string;

    @ApiProperty({ description: 'The key of the file in the storage', example: 'file_key_123' })
    @IsString()
    key: string;

    @ApiProperty({ description: 'The bucket name where the file is stored', example: 'my_bucket' })
    @IsString()
    bucket: string;

    @ApiProperty({ description: 'The name of the file', example: 'file.jpg' })
    @IsString()
    fileName: string;
}
