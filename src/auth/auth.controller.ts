import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Public()
    @Post('signIn')
    signInUser(@Body() data: SignInDto){
        return this.authService.signInUser(data)
    }


    @Public()
    @Post('admin/signIn')
    signInAdmin(@Body() data: SignInDto){
        console.log(data);
        
        return this.authService.signInAdmin(data)
    }
}
