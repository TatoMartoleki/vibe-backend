import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Role } from 'src/users/enum/roles.enum';

@Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly fileService: FilesService,
  ) {}

  @Roles(RoleEnum.admin)
  @Post('upload/:artistId')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('artistId') artistId: string,
  ) {
    const result = await this.fileService.uploadFile(file);
    return await this.albumService.create(result, createAlbumDto, +artistId);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('music/:albumId')
  async getMusicFromAlbum(@Param('albumId') albumId: string) {
    return await this.albumService.getMusicFromAlbum(+albumId);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('top')
  async getTopAlbum() {
    return await this.albumService.getTopAlbum();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}
