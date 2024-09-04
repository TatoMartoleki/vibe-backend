import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email is already in use.');
    }

    if(createUserDto.confirmPassword !== createUserDto.password){
       throw new BadRequestException("Password doesn't match")
    }
    return this.usersRepository.create(createUserDto);
  }

  
}


