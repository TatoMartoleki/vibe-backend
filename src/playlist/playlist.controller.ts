import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { request } from 'http';
import { AuthGuard } from 'src/auth/guards/auth.userGuard';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request) {
    const userId = request.user.payload.userId
    
    return await this.playlistService.create(createPlaylistDto, userId);
  }

  @Get()
  async findAll() {
    return await this.playlistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.update(+id, updatePlaylistDto);
  }

  @Patch(':playlistId/add/:musicId')
  async addMusic(@Param('playlistId') playlistId: number, @Param('musicId') musicId: number){
    return await this.playlistService.addMusic(playlistId, musicId)
  }

  @Patch(':playlistId/remove/:musicId')
  async removeMusic(@Param('playlistId') playlistId: number, @Param("musicId") musicId: number){
    return await this.playlistService.removeMusic(playlistId, musicId)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.remove(+id);
  }
}
