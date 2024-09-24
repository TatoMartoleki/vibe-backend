import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, UnauthorizedException} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard.ts';


@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService,
              private readonly fileService: FilesService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    const result = await this.fileService.uploadFile(file)
    return await this.musicService.create(result, createMusicDto, req.user);
  }

  @Get()
  async findAll() {
    return await this.musicService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId
    const musicId = +id
    return await this.musicService.findOne(+id, userId, musicId);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return await this.musicService.update(+id, updateMusicDto);
  }


  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}
