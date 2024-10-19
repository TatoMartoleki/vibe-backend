import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenService } from './listen.service';
import { CreateListenDto } from './dto/create-listen.dto';
import { UpdateListenDto } from './dto/update-listen.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListenEntity } from './entities/listen.entity';

@Controller('listen')
@ApiTags("listen counter")
@ApiBearerAuth()
export class ListenController {
  constructor(private readonly listenService: ListenService) {}

  @ApiOperation({summary: "Creates listening count info"})
  @ApiResponse({
    status: 200,
    description: 'Successfuly created listen info',
    type: ListenEntity

  })
  @Post()
  async create(@Body() userId: number, musicId: number) {
    return await this.listenService.create(userId, musicId);
  }

  
  @ApiResponse({
    status: 200,
    description: 'Successfuly got all listen info',
    type: ListenEntity

  })
  @ApiOperation({summary: "Gets listening count info"})
  @Get()
  findAll() {
    return this.listenService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Successfuly got a listen info',
    type: ListenEntity

  })
  @ApiOperation({summary: "Gets listening count info by Id"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listenService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfuly updated a listen info',
    type: ListenEntity

  })
  @ApiOperation({summary: "Updates listening count info by Id"})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListenDto: UpdateListenDto) {
    return this.listenService.update(+id, updateListenDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfuly deleted a listen info',
    type: ListenEntity

  })
  @ApiOperation({summary: "Delete listening count info by Id"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listenService.remove(+id);
  }
}
