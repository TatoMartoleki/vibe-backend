import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/userDtos/create-user.dto';
import { UpdateUserDto } from '../dto/userDtos/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UpdateUserAdminDto } from '../dto/adminDtos/update-admin.dto';

@Injectable()
export class UsersRepository {

  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>) { }

  async create(createUserDto: CreateUserDto) {

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const newUser = new UserEntity()
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;

    return this.userRepository.save(newUser);

  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }


  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      await this.userRepository.remove(user);
    }
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email: email }
    })
  }

  findByEmailAndReturnPassword(email: string) {
    return this.userRepository.findOne({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
      }
    })
  }


  async changePassword(userId: number, UpdateUserAdminDto: UpdateUserAdminDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId }, select: {
        id: true,
        email: true,
        password: true
      }
    })

    if (!user) {
      throw new UnauthorizedException("User not found")
    }

    if (UpdateUserAdminDto.newPassword !== UpdateUserAdminDto.confirmPassword) {
      throw new UnauthorizedException("Passwords do not match")
    }

    const hashedPassword = await bcrypt.hash(UpdateUserAdminDto.newPassword, 10)
    user.password = hashedPassword

    return this.userRepository.save(user);
  }

}