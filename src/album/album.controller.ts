import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { AlbumEntity } from './entities/album.entity';

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
  async findAll(
    @Query("limit") limit?: string,
    @Query("offset") offset?: string,
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const offsetNumber = offset ? parseInt(offset, 10) : undefined;
  
    return await this.albumService.findAll(limitNumber, offsetNumber); 
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
