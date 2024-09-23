import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard.ts';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { FilesService } from 'src/files/files.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService,
              private readonly fileService: FilesService) {}


  @UseGuards(AdminGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.uploadFile(file)
    return await this.authorService.create(result, createAuthorDto);
  }



  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(+id);
  }
  
  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(+id);
  }
}
