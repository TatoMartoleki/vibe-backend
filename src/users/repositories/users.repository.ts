import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    this.userRepository.save(newUser);

    const { password, ...result } = newUser

    return result

  }

  async findAll() {
    return await this.userRepository.find({
      withDeleted: true,
      select: {
        id: true,
        email: true,
        role: true,
        deletedAt: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }


  async blockUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'admin') {
      throw new BadRequestException('Cannot block/unblock an admin');
    }

    if (user.deletedAt) {
      await this.userRepository.recover(user);
      return { message: 'User unblocked successfully' };
    } else {
      await this.userRepository.softRemove(user);
      return { message: 'User blocked successfully' };
    };
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
        role: true,
        deletedAt: true
      },
      withDeleted: true
    })
  }


  async changePassword(userId: number, UpdateUserAdminDto: UpdateUserAdminDto, userRole: string) {

    if (userRole !== "admin") {
      throw new UnauthorizedException("You aren't admin")
    }

    const user = await this.userRepository.findOne({
      where: { id: userId }, select: {
        id: true,
        email: true,
        password: true,
        role: true,
      }
    })

    if (!user) {
      throw new UnauthorizedException("User not found")
    }

    if (user.role === "admin") {
      throw new BadRequestException("That user is an admin")
    }

    if (UpdateUserAdminDto.newPassword !== UpdateUserAdminDto.confirmPassword) {
      throw new UnauthorizedException("Passwords do not match")
    }

    const hashedPassword = await bcrypt.hash(UpdateUserAdminDto.newPassword, 10)
    user.password = hashedPassword

    return this.userRepository.save(user);
  }

}