import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({ description: "The user's email address', example: 'user@example.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ description: "The user's password', example: 'securePassword123" })
    @IsString()
    password: string;

    @ApiProperty({ description: "A confirmation of the user's password', example: 'securePassword123" })
    @IsString()
    confirmPassword: string;
}
