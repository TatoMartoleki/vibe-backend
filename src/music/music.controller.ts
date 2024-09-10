import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Admin } from 'typeorm';
import { AdminGuard } from 'src/auth/guards/auth.adminGuard';
import { AuthGuard } from 'src/auth/guards/auth.userGuard';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    return await this.musicService.create(createMusicDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.musicService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return await this.musicService.update(+id, updateMusicDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}
