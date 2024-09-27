import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/userDtos/create-user.dto';
import { UpdateUserDto } from './dto/userDtos/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard.ts';
import { request } from 'http';
import { UpdateUserAdminDto } from './dto/adminDtos/update-admin.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async findMe(@Req() request){    
    return await this.usersService.findMe(request.user.userId)
  }


  @UseGuards(AdminGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':userId/change-password')
  async changePassword(@Param('userId') userId: number, @Body() UpdateUserAdminDto: UpdateUserAdminDto, @Req() request){  
    const userRole = request.user.role
    
    return this.usersService.changePassword(userId, UpdateUserAdminDto, userRole)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async blockUser(@Param('id') id: string) {
    return await this.usersService.blockUser(+id);
  }
}
