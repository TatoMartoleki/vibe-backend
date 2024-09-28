import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signIn-user.dto';
import { Public } from './decorators/public.decorator';
import { request } from 'http';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('signIn')
    signInUser(@Body() data: SignInUserDto){
        return this.authService.signInUser(data)
    }

    @Public()
    @Post('admin/signIn')
    signInAdmin(@Body() data: SignInUserDto, @Req() request){
        console.log(request);
        
        return this.authService.signInAdmin(data)
    }
}
