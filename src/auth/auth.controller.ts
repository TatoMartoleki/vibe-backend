import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('signIn')
    signInUser(@Body() data: SignInDto){
        return this.authService.signInUser(data)
    }

    @Post('admin/signIn')
    signInAdmin(@Body() data: SignInDto){
        return this.authService.signInAdmin(data)
    }
}
