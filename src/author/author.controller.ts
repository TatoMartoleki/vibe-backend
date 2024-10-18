import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { FilesService } from 'src/files/files.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('author')
@ApiTags("authors")
@ApiBearerAuth()
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly fileService: FilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an author' })
  @ApiResponse({ 
    status: 201, 
    description: 'Author created successfully.',
    example: {
      'application/json': {
        id: 1,
        name: 'John Doe',
        bio: 'A talented musician',
        photoUrl: 'https://example.com/photo.jpg',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.fileService.uploadFile(file);
    return await this.authorService.create(result, createAuthorDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('recent')
  @ApiOperation({ summary: 'Get recently added music' })
  @ApiResponse({ 
    status: 200, 
    description: 'Recently added music retrieved successfully.',
    example: {
      'application/json': [
        { id: 1, title: 'Song One', artist: 'John Doe', album: 'Album One' },
        { id: 2, title: 'Song Two', artist: 'Jane Smith', album: 'Album Two' },
      ],
    },
  })
  async recentlyMusic() {
    return await this.authorService.recentlyMusic();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get("top")
  @ApiOperation({ summary: 'Get top artists' })
  @ApiResponse({ 
    status: 200, 
    description: 'Top artists retrieved successfully.',
    example: {
      'application/json': [
        { id: 1, name: 'John Doe', photoUrl: 'https://example.com/photo.jpg', rating: 4.8 },
        { id: 2, name: 'Jane Smith', photoUrl: 'https://example.com/photo.jpg', rating: 4.5 },
      ],
    },
  })
  async getTopArtists(){    
    return await this.authorService.getTopArtists()
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  @ApiOperation({ summary: 'Retrieve all authors' })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @ApiQuery({ name: 'offset', required: true, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'List of authors retrieved successfully.',
    example: {
      'application/json': [
        { id: 1, name: 'John Doe', photoUrl: 'https://example.com/photo.jpg' },
        { id: 2, name: 'Jane Smith', photoUrl: 'https://example.com/photo.jpg' },
      ],
    },
  })
  async findAll(
    @Query("limit") limit: number, 
    @Query("offset") offset: number,
    @Query('search') search?: string
  ) {
    return await this.authorService.findAll(limit, offset, search);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an author by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Author retrieved successfully.',
    example: {
      'application/json': {
        id: 1,
        name: 'John Doe',
        bio: 'A talented musician',
        photoUrl: 'https://example.com/photo.jpg',
      },
    },
  })
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Update an author' })
  @ApiResponse({ 
    status: 200, 
    description: 'Author updated successfully.',
    example: {
      'application/json': {
        id: 1,
        name: 'Updated Author Name',
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({ 
    status: 200, 
    description: 'Author deleted successfully.',
    example: {
      'application/json': {
        message: 'Author deleted successfully.',
      },
    },
  })
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(+id);
  }
}
