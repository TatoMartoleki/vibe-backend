import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './repositories/playlist.repository';

@Injectable()
export class PlaylistService {
  constructor(private readonly playlistRepository: PlaylistRepository){}

  async create(createPlaylistDto: CreatePlaylistDto, userId: number) {
    return await this.playlistRepository.create(createPlaylistDto, userId);
  }

  async findAll(userId: number) {
    return await this.playlistRepository.findAll(userId);
  }

  async adminFindAll(userId: number){
    return await this.playlistRepository.adminFindAll(userId)
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

  async update(playlistId: number, updatePlaylistDto: UpdatePlaylistDto, userId: number) {    
    return await this.playlistRepository.update(playlistId, updatePlaylistDto, userId);
  }

  async editPlaylist(playlistId: number, userId: number, UpdatePlaylistDto: UpdatePlaylistDto){
    return await this.playlistRepository.editPlaylist(playlistId, userId, UpdatePlaylistDto)
  }

  async addMusic(PlaylistId: number, MusicId: number, userId: number){
    return await this.playlistRepository.addMusic(PlaylistId, MusicId, userId)
  }

  async removeMusic(playlist: number, musicId: number, userId: number){
    return await this.playlistRepository.removeMusic(playlist, musicId, userId)
  }

  async remove(id: number, userId: number) {
    return await this.playlistRepository.remove(id, userId);
  }

  async adminRemove(userId: number, playlistId: number){
    return await this.playlistRepository.adminRemove(userId, playlistId)
  }
}
