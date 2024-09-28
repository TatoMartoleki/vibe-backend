import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.service';
import { Role } from 'src/users/enum/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { request } from 'http';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.create(createPlaylistDto, userId);
  }

  @Roles(RoleEnum.admin)
  @Get()
  async findAll(@Req() request) {
    
    return await this.playlistService.findAll();

  }

  @Roles(RoleEnum.admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.update(+id, updatePlaylistDto);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Patch(':playlistId/add/:musicId')
  async addMusic(@Param('playlistId') playlistId: number, @Param('musicId') musicId: number) {
    return await this.playlistService.addMusic(playlistId, musicId)
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Patch(':playlistId/remove/:musicId')
  async removeMusic(@Param('playlistId') playlistId: number, @Param("musicId") musicId: number) {
    return await this.playlistService.removeMusic(playlistId, musicId)
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(+id);
  }
}
