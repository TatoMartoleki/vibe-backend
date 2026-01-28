import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { SignInDto } from './dto/signIn-user.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  


  async signInUser(data: SignInDto) {
    const user = await this.usersRepository.findByEmailAndReturnPassword(
      data.email,
    );

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException(
        'This account has been deactivated. Please contact support.',
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  async signInAdmin(data: SignInDto) {
    const user = await this.usersRepository.findByEmailAndReturnPassword(
      data.email,
    );

    

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException(
        'This account has been deactivated. Please contact support.',
      );
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('You are not Admin');
    }

    const isPasswordCorrect = await bcryptjs.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    

    const payload = {
      userId: user.id,
      role: user.role,
    };    

    const accessToken = await this.jwtService.signAsync(payload);


    return { accessToken };
  }
}
