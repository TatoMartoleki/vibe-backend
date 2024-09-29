import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
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

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get("musics/:id")
  async findMusicFromPlaylist(@Req() request, @Param("id") id: string){
    const userId = request.user.userId
    return await this.playlistService.findMusicFromPlaylist(userId, +id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Get()
  async findAll(@Req() request) {
    const userId = request.user.userId
    return await this.playlistService.findAll(userId);
  }

  @Roles(RoleEnum.admin)
  @Get('admin/:userId')
  async adminFindAll(@Param('userId') userId: string){
    return await this.playlistService.findAll(+userId)
  }

  @Roles(RoleEnum.admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Patch(':playlistId')
  async update(@Param('playlistId') playlistId: string, @Body() updatePlaylistDto: UpdatePlaylistDto, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.update(+playlistId, updatePlaylistDto, userId);
  }

  @Roles(RoleEnum.admin)
  @Patch(':userId/edit/:playlistId')
  async editPlaylist(@Param('playlistId') playlistId: string, @Param('userId') userId: string, @Body() UpdatePlaylistDto: UpdatePlaylistDto){
    return await this.playlistService.editPlaylist(+playlistId, +userId, UpdatePlaylistDto)
  }

  @Roles(RoleEnum.user)
  @Patch(':playlistId/add/:musicId')
  async addMusic(@Param('playlistId') playlistId: string, @Param('musicId') musicId: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.addMusic(+playlistId, +musicId, userId)
  }

  @Roles(RoleEnum.user)
  @Patch(':playlistId/remove/:musicId')
  async removeMusic(@Param('playlistId') playlistId: string, @Param("musicId") musicId: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.removeMusic(+playlistId, +musicId, userId)
  }

  @Roles(RoleEnum.admin, RoleEnum.user)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.remove(+id, userId);
  }

  @Roles(RoleEnum.admin)
  @Delete(':userId/admin/:playlistId')
  async adminRemove(@Param('userId') userId: string, @Param('playlistId') playlistId: string){
    return await this.playlistService.adminRemove(+userId, +playlistId)
  }
}
