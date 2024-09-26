import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/signIn-user.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository,
                private readonly jwtService: JwtService
    ){}

    async signInUser(data: SignInUserDto){
        const user = await  this.usersRepository.findByEmailAndReturnPassword(data.email) 
        
        if(!user){
            throw new UnauthorizedException('Access Denied')
        }        

        const isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        )

        if(!isPasswordCorrect){
            throw new UnauthorizedException('Email or password is incorect')
        }

        const payload = {
            userId: user.id,
            role: user.role
        }
        

        const jwtToken = await this.jwtService.signAsync(payload);

        return {
            accessToken: jwtToken
        }
    }

}
