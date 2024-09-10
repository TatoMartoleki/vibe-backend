import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './dto/signIn-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('signIn')
    signInUser(@Body() data: SignInUserDto){
        return this.authService.signInUser(data)
    }

}
