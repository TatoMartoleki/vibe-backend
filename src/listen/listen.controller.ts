import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenService } from './listen.service';
import { CreateListenDto } from './dto/create-listen.dto';
import { UpdateListenDto } from './dto/update-listen.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';

@Controller('listen')
export class ListenController {
  constructor(private readonly listenService: ListenService) {}

  @Post()
  async create(@Body() userId: number, musicId: number) {
    return await this.listenService.create(userId, musicId);
  }

  @Get()
  findAll() {
    return this.listenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListenDto: UpdateListenDto) {
    return this.listenService.update(+id, updateListenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listenService.remove(+id);
  }
}
