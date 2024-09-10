import { IsEmail, IsOptional, IsString } from "class-validator"

export class CreateUserDto {

    @IsOptional()
    @IsString()
    firstName: string

    @IsOptional()
    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    confirmPassword: string

}
