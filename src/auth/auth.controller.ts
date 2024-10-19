import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-user.dto';
import { Public } from './decorators/public.decorator';
import { request } from 'http';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('authorization')
@ApiBearerAuth()
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @ApiOperation({
        summary: 'authenticate by email and password'
    })
    @ApiResponse({
        description: "user authenticated successfuly",
        status: 201,
        example: {
            email: 'user@example.com',
            password: "securedPassword123"
        }
    })
    @Public()
    @Post('signIn')
    signInUser(@Body() data: SignInDto){
        return this.authService.signInUser(data)
    }

    @ApiOperation({
        summary: 'authenticate by email and password'
    })
    @ApiResponse({
        description: "admin authenticated successfuly",
        status: 201,
        example: {
            email: 'user@example.com',
            password: "securedPassword123"
        }
    })
    @Public()
    @Post('admin/signIn')
    signInAdmin(@Body() data: SignInDto){
        return this.authService.signInAdmin(data)
    }
}
