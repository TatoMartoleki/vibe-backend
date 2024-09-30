import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "../../enum/roles.enum"

export class CreateUserDto {

    @IsEmail({}, { message: 'Invalid email' })
    email: string

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    password: string

    @IsString()
    confirmPassword: string

}
