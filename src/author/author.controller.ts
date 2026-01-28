import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';

@Controller('author')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly fileService: FilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.fileService.uploadFile(file);
    return await this.authorService.create(result, createAuthorDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get('recent')
  async recentlyMusic() {
    return await this.authorService.recentlyMusic();
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get("top")
  async getTopArtists(){    
    return await this.authorService.getTopArtists()
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  async findAll(
    @Query("limit") limit?: string, 
    @Query("offset") offset?: string, 
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : undefined;
    const offsetNumber = offset ? parseInt(offset, 10) : undefined; 
  
    const finalLimit = !isNaN(limitNumber) ? Math.min(12, limitNumber) : undefined;
    const finalOffset = !isNaN(offsetNumber) ? offsetNumber : undefined; 
  
    return await this.authorService.findAll(finalLimit, finalOffset); 
  }
  

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authorService.findOne(+id);
  }

  @Roles(RoleEnum.admin)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @Roles(RoleEnum.admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(+id);
  }
}
