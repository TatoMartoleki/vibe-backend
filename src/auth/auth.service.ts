import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signIn-user.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {

    constructor(private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService
    ) { }

    async signInUser(data: SignInDto) {
        const user = await this.usersRepository.findByEmailAndReturnPassword(data.email)


        if (!user) {
            throw new UnauthorizedException("User doesn't exist")
        }
        
        if (user.deletedAt) {
            throw new UnauthorizedException('This account has been deactivated. Please contact support.');
        }

        const isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        )

        if (!isPasswordCorrect) {
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

    async signInAdmin(data: SignInDto) {
        const user = await this.usersRepository.findByEmailAndReturnPassword(data.email)


        const isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        )

        if (user.deletedAt) {
            throw new UnauthorizedException('This account has been deactivated. Please contact support.');
        }

        if (!user || !isPasswordCorrect) {
            throw new UnauthorizedException('Email or password is incorect')
        }



        if (user.role !== "admin") {
            throw new UnauthorizedException('You are not Admin')
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
