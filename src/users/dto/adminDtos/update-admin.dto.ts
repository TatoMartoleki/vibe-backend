import { PartialType } from "@nestjs/mapped-types";
import { CreateUserAdminDto } from "./create-admin.dto";
import { IsString, MinLength } from "class-validator";

export class UpdateUserAdminDto extends PartialType(CreateUserAdminDto) {
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    newPassword?: string;

    @IsString()
    confirmPassword?: string;
}