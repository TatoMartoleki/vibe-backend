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

  async findAll() {
    return await this.playlistRepository.findAll();
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update(id, updatePlaylistDto);
  }

  async addMusic(PlaylistId: number, MusicId: number){
    return await this.playlistRepository.addMusic(PlaylistId, MusicId)
  }

  async removeMusic(playlist: number, musicId: number){
    return await this.playlistRepository.removeMusic(playlist, musicId)
  }

  async remove(id: number) {
    return await this.playlistRepository.remove(id);
  }
}
