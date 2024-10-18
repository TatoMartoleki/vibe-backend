import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {

    @ApiProperty({ description: 'The user\'s email address', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'The user\'s password', example: 'securePassword123' })
    @IsString()
    password: string;
}
