import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { request } from 'http';
import { AdminGuard } from 'src/auth/guards/admin.guard.ts';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.create(createPlaylistDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() request) {
    const userId = request.user.userId
    return await this.playlistService.findAll(userId);
  }

  @UseGuards(AdminGuard)
  @Get('admin/:userId')
  async adminFindAll(@Param('userId') userId: string){
    return await this.playlistService.findAll(+userId)
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':playlistId')
  async update(@Param('playlistId') playlistId: string, @Body() updatePlaylistDto: UpdatePlaylistDto, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.update(+playlistId, updatePlaylistDto, userId);
  }

  @UseGuards(AdminGuard)
  @Patch(':userId/edit/:playlistId')
  async editPlaylist(@Param('playlistId') playlistId: string, @Param('userId') userId: string, @Body() UpdatePlaylistDto: UpdatePlaylistDto){
    return await this.playlistService.editPlaylist(+playlistId, +userId, UpdatePlaylistDto)
  }

  @UseGuards(AuthGuard)
  @Patch(':playlistId/add/:musicId')
  async addMusic(@Param('playlistId') playlistId: string, @Param('musicId') musicId: string) {
    return await this.playlistService.addMusic(+playlistId, +musicId)
  }

  @UseGuards(AuthGuard)
  @Patch(':playlistId/remove/:musicId')
  async removeMusic(@Param('playlistId') playlistId: string, @Param("musicId") musicId: string) {
    return await this.playlistService.removeMusic(+playlistId, +musicId)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request) {
    const userId = request.user.userId
    return await this.playlistService.remove(+id, userId);
  }

  @UseGuards(AdminGuard)
  @Delete('admin/:id')
  async adminRemove(@Param('id') id: string){
    return await this.playlistService.adminRemove(+id)
  }
}
