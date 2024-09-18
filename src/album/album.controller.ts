import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from 'src/auth/guards/auth.userGuard';
import { AdminGuard } from 'src/auth/guards/auth.adminGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { AlbumEntity } from './entities/album.entity';


@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService, 
              private readonly fileService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.uploadFile(file)
    return await this.albumService.create(result, createAlbumDto);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async create(
  //   @Body() createAlbumDto: CreateAlbumDto,
  //   @UploadedFile() file: Express.Multer.File // Correct type
  // ): Promise<AlbumEntity> {
  //   const uploadedFile = await this.fileService.uploadFile(file); // Handle file upload and get result
  //   return await this.albumService.create(file, createAlbumDto); // Call service to create album
  // }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}
