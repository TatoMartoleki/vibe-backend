import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req, UnauthorizedException} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { AuthGuard } from 'src/auth/guards/auth-guard.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';


@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService,
              private readonly fileService: FilesService
  ) {}

  @Roles(RoleEnum.admin)
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

  @Roles(RoleEnum.admin)
  @Get()
  async findAll() {
    return await this.musicService.findAll();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId
    const musicId = +id
    return await this.musicService.findOne(+id, userId, musicId);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return await this.musicService.update(+id, updateMusicDto);
  }


  @Roles(RoleEnum.admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}
