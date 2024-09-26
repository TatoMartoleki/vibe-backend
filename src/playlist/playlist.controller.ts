import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { request } from 'http';

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


  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.update(+id, updatePlaylistDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':playlistId/add/:musicId')
  async addMusic(@Param('playlistId') playlistId: number, @Param('musicId') musicId: number) {
    return await this.playlistService.addMusic(playlistId, musicId)
  }

  @UseGuards(AuthGuard)
  @Patch(':playlistId/remove/:musicId')
  async removeMusic(@Param('playlistId') playlistId: number, @Param("musicId") musicId: number) {
    return await this.playlistService.removeMusic(playlistId, musicId)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(+id);
  }
}
