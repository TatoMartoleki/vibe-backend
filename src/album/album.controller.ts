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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('album')
@ApiTags('albums')
@ApiBearerAuth()
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly fileService: FilesService,
  ) {}

  @Roles(RoleEnum.admin)
  @Post('upload/:artistId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an album' })
  @ApiResponse({ 
    status: 201, 
    description: 'Album created successfully.',
    example: {
      'application/json': {
        id: 1,
        title: 'New Album',
        artistId: 123,
        releaseDate: '2024-10-17',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
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
  @ApiOperation({ summary: 'Get music from an album' })
  @ApiResponse({ 
    status: 200, 
    description: 'Music retrieved successfully.',
    example:{
     
        tracks: [
          { id: 1, title: 'Song One', duration: '3:45' },
          { id: 2, title: 'Song Two', duration: '4:05' },
        ],
    },
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async getMusicFromAlbum(@Param('albumId') albumId: string) {
    return await this.albumService.getMusicFromAlbum(+albumId);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('top')
  @ApiOperation({ summary: 'Get top albums' })
  @ApiResponse({ 
    status: 200, 
    description: 'Top albums retrieved successfully.',
    example: {
      'application/json': [
        { id: 1, title: 'Top Album One', artistId: 123, rating: 4.8 },
        { id: 2, title: 'Top Album Two', artistId: 456, rating: 4.5 },
      ],
    },
  })
  async getTopAlbum() {
    return await this.albumService.getTopAlbum();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  @ApiOperation({ summary: 'Retrieve all albums' })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'offset', required: true, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'List of albums retrieved successfully.',
    example: {
      'application/json': [
        { id: 1, title: 'Album One', artistId: 123 },
        { id: 2, title: 'Album Two', artistId: 456 },
      ],
    },
  })
  async findAll(
    @Query("limit") limit: number, 
    @Query("offset") offset: number,
    @Query('search') search?: string
  ) {
    return await this.albumService.findAll(limit, offset, search);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an album by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Album retrieved successfully.',
    example: {
      'application/json': {
        id: 1,
        title: 'Album One',
        artistId: 123,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an album' })
  @ApiResponse({ 
    status: 200, 
    description: 'Album updated successfully.',
    example: {
      'application/json': {
        id: 1,
        title: 'Updated Album Title',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an album' })
  @ApiResponse({ 
    status: 200, 
    description: 'Album deleted successfully.',
    example: {
      'application/json': {
        message: 'Album deleted successfully.',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}
