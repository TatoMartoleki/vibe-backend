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
  UploadedFiles,
  Req,
  UnauthorizedException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Role } from 'src/users/enum/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusicEntity } from './entities/music.entity';

@Controller('music')
@ApiTags("musics")
@ApiBearerAuth('bci wei kwcec b')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly fileService: FilesService,
  ) {}

  @Roles(RoleEnum.admin)
  @Post('upload/:albumId')
  
  @ApiOperation({ summary: 'Uploads a new music file' })
  @ApiResponse({
    status: 201,
    description: 'The music has been successfully uploaded.',
    type: MusicEntity,
    example: {
      example: {
        summary: 'Successful upload',
        value: {
          id: 1,
          title: 'New Song',
          artist: 'Artist Name',
          albumId: 1,
          photoUrl: 'http://example.com/photo.jpg',
          mp3Url: 'http://example.com/song.mp3',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'mp3', maxCount: 1 },
    ]),
  )
  async create(
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFiles()
    files: { photo?: Express.Multer.File[]; mp3?: Express.Multer.File[] },
    @Req() req,
    @Param('albumId') albumId: string,
  ) {
    const photoResult = await this.fileService.uploadFile(files.photo[0]);
    const mp3Result = await this.fileService.uploadFile(files.mp3[0]);
    return await this.musicService.create(
      photoResult,
      mp3Result,
      createMusicDto,
      +albumId
    );
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('random')
  @ApiOperation({ summary: 'Gets Random Music' })
  
  @ApiResponse({
    status: 200,
    description: 'Random music retrieved successfully.',
    type: [MusicEntity],
    example: {
      example: {
        summary: 'Random music example',
        value: [
          {
            id: 1,
            title: 'Random Song',
            artist: 'Random Artist',
            albumId: 1,
            photoUrl: 'http://example.com/photo.jpg',
            mp3Url: 'http://example.com/song.mp3',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getRandomMusic() {
    return await this.musicService.getRandomMusic();
  }
  
  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('weekCharts')
  
  @ApiOperation({ summary: 'Gets Top Hits Of The Week' })
  @ApiResponse({
    status: 200,
    description: 'Top hits of the week retrieved successfully.',
    type: [MusicEntity],
    example: {
      example: {
        summary: 'Top hits of the week example',
        value: [
          {
            id: 1,
            title: 'Top Hit Song',
            artist: 'Top Artist',
            albumId: 1,
            photoUrl: 'http://example.com/photo.jpg',
            mp3Url: 'http://example.com/song.mp3',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async topHitsOfTheWeek() {
    return await this.musicService.topHitsOfTheWeek();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('top')
  @ApiOperation({ summary: 'Gets Top Music' })
  
  @ApiResponse({
    status: 200,
    description: 'Top music retrieved successfully.',
    type: [MusicEntity],
    example: {
      example: {
        summary: 'Top music example',
        value: [
          {
            id: 1,
            title: 'Top Song',
            artist: 'Top Artist',
            albumId: 1,
            photoUrl: 'http://example.com/photo.jpg',
            mp3Url: 'http://example.com/song.mp3',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getTopMusic() {
    return await this.musicService.getTopMusic();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('recent')
  @ApiOperation({ summary: 'Gets Recently Added Music' })
  
  @ApiResponse({
    status: 200,
    description: 'Recently added music retrieved successfully.',
    type: [MusicEntity],
    example: {
      example: {
        summary: 'Recently added music example',
        value: [
          {
            id: 1,
            title: 'Recent Song',
            artist: 'Recent Artist',
            albumId: 1,
            photoUrl: 'http://example.com/photo.jpg',
            mp3Url: 'http://example.com/song.mp3',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async recentlyMusic() {
    return await this.musicService.recentlyMusic();
  }

  @Get('shuffle')
  @ApiOperation({ summary: 'Shuffles Musics' })
  
  @ApiResponse({
    status: 200,
    description: 'Music shuffled successfully.',
    type: [MusicEntity],
    example: {
      example: {
        summary: 'Shuffled music example',
        value: [
          {
            id: 1,
            title: 'Shuffled Song',
            artist: 'Shuffled Artist',
            albumId: 1,
            photoUrl: 'http://example.com/photo.jpg',
            mp3Url: 'http://example.com/song.mp3',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async shuffleMusics() {
    return this.musicService.shuffleMusics();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  @ApiOperation({ summary: 'Gets All Musics' })
  @ApiResponse({
    status: 200,
    description: 'All music retrieved successfully.',
    type: [MusicEntity],
    example: {
      example: {
        summary: 'All music example',
        value: [
          {
            id: 1,
            title: 'Song 1',
            artist: 'Artist 1',
            albumId: 1,
            photoUrl: 'http://example.com/photo1.jpg',
            mp3Url: 'http://example.com/song1.mp3',
          },
          {
            id: 2,
            title: 'Song 2',
            artist: 'Artist 2',
            albumId: 2,
            photoUrl: 'http://example.com/photo2.jpg',
            mp3Url: 'http://example.com/song2.mp3',
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'offset', required: true, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  
  async findAll(
    @Query("limit") limit: number, 
    @Query("offset") offset: number,
    @Query('search') search?: string) {
    return await this.musicService.findAll(limit, offset, search);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  @ApiOperation({ summary: 'Gets Music By Id' })
  
  @ApiResponse({
    status: 200,
    description: 'Music retrieved successfully.',
    type: MusicEntity,
    example: {
      example: {
        summary: 'Music by ID example',
        value: {
          id: 1,
          title: 'Song by ID',
          artist: 'Artist by ID',
          albumId: 1,
          photoUrl: 'http://example.com/photo.jpg',
          mp3Url: 'http://example.com/song.mp3',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Music not found.' })
  async findOne(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId;
    const musicId = +id;
    return await this.musicService.findOne(+id, +userId, +musicId);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Updates Music By Id' })
  
  @ApiResponse({
    status: 200,
    description: 'Music updated successfully.',
    type: MusicEntity,
    example: {
      example: {
        summary: 'Updated music example',
        value: {
          id: 1,
          title: 'Updated Song',
          artist: 'Updated Artist',
          albumId: 1,
          photoUrl: 'http://example.com/photo.jpg',
          mp3Url: 'http://example.com/song.mp3',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Music not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return await this.musicService.update(+id, updateMusicDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes Music By Id' })
  
  @ApiResponse({
    status: 200,
    description: 'Music deleted successfully.',
    example: {
      example: {
        summary: 'Deleted music example',
        value: {
          message: 'Music with ID 1 has been deleted.',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Music not found.' })
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}
