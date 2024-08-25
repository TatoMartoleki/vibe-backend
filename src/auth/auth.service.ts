import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/signIn-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt'; 


@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository){}

    async signInUser(data: SignInUserDto){
        const user = await  this.usersRepository.findByEmailAndReturnPassword(data.email) 
        if(!user){
            throw new UnauthorizedException('Access Denied')
        }

        console.log(user);
        

        const isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        )

        if(!isPasswordCorrect){
            throw new UnauthorizedException('Access Denied')
        }

        return user
    }

}
