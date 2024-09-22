import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator"
import { Role } from "../enum/roles.enum"

export class CreateUserDto {

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    confirmPassword: string

}
