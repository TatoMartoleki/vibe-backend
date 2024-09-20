import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { AdminGuard } from 'src/auth/guards/auth.adminGuard';
import { AuthGuard } from 'src/auth/guards/auth.userGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';


@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService,
              private readonly fileService: FilesService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File
  ) {

      console.log(createMusicDto)
    const result = await this.fileService.uploadFile(file)
    return await this.musicService.create(result, createMusicDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.musicService.findAll();
  }

  // @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.payload.userId
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
