import { IsNumber, IsString } from "class-validator"

export class CreateFileDto {

    @IsNumber()
    id: number

    @IsString()
    url: string

    @IsString()
    key: string

    @IsString()
    bucket: string


    @IsString()
    fileName: string
}