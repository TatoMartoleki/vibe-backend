import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto } from './dto/signIn-user.dto';
import { UsersRepository } from 'src/users/users.repository';
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
            throw new UnauthorizedException('Access Denied')
        }

        const payload = {
            userId: user .id, 
            name: user.firstName
        }

        const jwtToken = await this.jwtService.signAsync({payload});

        return {
            accessToken: jwtToken ,
            name: user.firstName,
            email: user.email,
            id: user.id,
            role: 'user'
        }
    }

}


// sheqmeni auth guard
// login user
// aige accessToken rac mogca loginma da chasvi sxva requestshi
// 
