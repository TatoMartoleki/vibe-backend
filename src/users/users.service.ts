import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { request } from 'http';
import { Any } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email is incorrect');
    }



    if (createUserDto.confirmPassword !== createUserDto.password) {
      throw new BadRequestException("Password doesn't match")
    }
    return this.usersRepository.create(createUserDto);
  }

  async findMe(myId : number) {
    return await this.usersRepository.findOne(myId) 
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.remove(id);

  }

}
