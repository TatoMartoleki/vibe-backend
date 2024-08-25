import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}

  create(createUserDto: CreateUserDto) {
    if(createUserDto.confirmPassword !== createUserDto.password){
       throw new BadRequestException("P assword doesn't match")
    }
    return this.usersRepository.create(createUserDto);
  }

  
}


