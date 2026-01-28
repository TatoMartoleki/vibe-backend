import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { GenreEntity } from './entities/genre.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService,
    private readonly fileService: FilesService) { }

  @Roles(RoleEnum.admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createGenreDto: CreateGenreDto, @UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.uploadFile(file)
    return await this.genresService.create(createGenreDto, result);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  async findAll() {
    return await this.genresService.findAll();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.genresService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return await this.genresService.update(+id, updateGenreDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.genresService.remove(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id/musics')
  async findMusicByGenre(@Param('id') id: string) {
    return await this.genresService.findMusicByGenre(+id);
  }

  @Roles(RoleEnum.admin)
  @Post(':genreId/musics/:musicId')
  async addMusicToGenre(@Param('genreId') genreId: string, @Param('musicId') musicId: string) {
    return await this.genresService.addMusicToGenre(+genreId, +musicId);
  }
}
