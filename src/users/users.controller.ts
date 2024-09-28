import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/userDtos/create-user.dto';
import { UpdateUserDto } from './dto/userDtos/update-user.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { UpdateUserAdminDto } from './dto/adminDtos/update-admin.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('me')
  async findMe(@Req() request){    
    return await this.usersService.findMe(request.user.userId)
  }

  @Roles(RoleEnum.admin)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Roles(RoleEnum.admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Roles(RoleEnum.admin)  
  @Patch(':userId/change-password')
  async changePassword(@Param('userId') userId: number, @Body() UpdateUserAdminDto: UpdateUserAdminDto, @Req() request){  
    const userRole = request.user.role
    
    return this.usersService.changePassword(userId, UpdateUserAdminDto, userRole)
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  async blockUser(@Param('id') id: string) {
    return await this.usersService.blockUser(+id);
  }
}
