import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Role } from 'src/users/enum/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenreEntity } from './entities/genre.entity';

@Controller('genres')
@ApiTags("genres")
@ApiBearerAuth()
export class GenresController {
  constructor(private readonly genresService: GenresService,
    private readonly fileService: FilesService) { }

  @Roles(RoleEnum.admin)
  @ApiOperation({summary: 'create a new genre'})
  @ApiResponse({
    status: 201,
    description: 'New genre successfully created',
    type: GenreEntity,
    example: {
      name: 'shengelia',
      file: {
        id: 243,
        url: 'https://album-ultraviolence-vibe-backend.s3.eu-north-1.amazonaws.com/file_9awmji_2ke2iz.pdf',
        key: 'file_9awmji_2ke2iz.pdf',
        bucket: 'album-ultraviolence-vibe-backend',
        fileName: 'file_9awmji_2ke2iz.pdf'
      },
      id: 5
    }
  })  
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createGenreDto: CreateGenreDto, @UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.uploadFile(file)
    return await this.genresService.create(createGenreDto, result);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Get all genres'})
  @Get()
  async findAll() {
    return await this.genresService.findAll();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Get a genre by Id'})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.genresService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @ApiOperation({summary: 'Update a genre by Id'})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return await this.genresService.update(+id, updateGenreDto);
  }

  @Roles(RoleEnum.admin)
  @ApiOperation({summary: 'Delete a genre by Id'})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.genresService.remove(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @ApiOperation({summary: 'Get musics by genre Id'})
  @Get(':id/musics')
  async findMusicByGenre(@Param('id') id: string) {
    return await this.genresService.findMusicByGenre(+id);
  }

  @Roles(RoleEnum.admin)
  @ApiOperation({summary: 'Create a music by genre Id'})
  @Post(':genreId/musics/:musicId')
  async addMusicToGenre(@Param('genreId') genreId: string, @Param('musicId') musicId: string) {
    return await this.genresService.addMusicToGenre(+genreId, +musicId);
  }
}
