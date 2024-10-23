import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/userDtos/create-user.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { UpdateUserAdminDto } from './dto/adminDtos/update-admin.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';



@Controller('users')
@ApiTags("users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ApiOperation({summary: 'Created new user'})
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: "Successfuly created a new user"
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Get your profile'})
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: "Successfuly got your profile"
  })
  @Get('me')
  async findMe(@Req() request){        
    return await this.usersService.findMe(request.user.userId)
  }
  
  @Roles(RoleEnum.admin)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: 'Successfully got all users',
  })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'offset', required: true, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @Get()
  async findAll(
    @Query('limit') limit?: string, 
    @Query('offset') offset?: string
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const offsetNumber = offset ? parseInt(offset, 10) : undefined;
  
    const finalLimit = !isNaN(limitNumber) ? limitNumber : undefined;
    const finalOffset = !isNaN(offsetNumber) ? offsetNumber : undefined;
  
    return await this.usersService.findAll(finalLimit, finalOffset);
  }
  

  @ApiOperation({summary: 'Get an user by Id'})
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: "Successfuly got an user by Id"
  })
  @Roles(RoleEnum.admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Roles(RoleEnum.admin)  
  @ApiOperation({summary: 'Change password by userId'})
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: "Successfuly changed a password by userId"
  })
  @Patch(':userId/change-password')
  async changePassword(@Param('userId') userId: number, @Body() UpdateUserAdminDto: UpdateUserAdminDto, @Req() request){  
    const userRole = request.user.role
    
    return this.usersService.changePassword(userId, UpdateUserAdminDto, userRole)
  }

  @Roles(RoleEnum.admin)
  @ApiOperation({summary: 'Delete user by Id'})
  @ApiResponse({
    status: 200,
    type: [UserEntity],
    description: "Successfuly deleted an user by Id"
  })
  @Delete(':id')
  async blockUser(@Param('id') id: string) {
    return await this.usersService.blockUser(+id);
  }
}
