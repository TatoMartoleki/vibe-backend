import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt' ; 

@Injectable()
export class UsersRepository {

    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){}

  async create(createUserDto: CreateUserDto) {

    console.log(createUserDto);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)    

    const newUser = new UserEntity()
    newUser.firstName = createUserDto.firstName;
    newUser.lastName = createUserDto.lastName;
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;

    return this.userRepository.save(newUser);
 
  }

  findByEmail(email: string ){
    return this.userRepository.findOne({
       where: { email: email },
  } )
}

  findByEmailAndReturnPassword(email: string ){
    return this.userRepository.findOne({
       where: { email: email },
       select: {email: true, password: true}})
  }

  
}