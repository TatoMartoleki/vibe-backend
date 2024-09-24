import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './repositories/music.repository';
import { FileEntity } from 'src/files/entities/file.entity';
import { ListenRepository } from 'src/listen/repositories/listen.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly listenRepository: ListenRepository,
  ) {}

  async create(file: FileEntity, createMusicDto: CreateMusicDto, user) {        
    return await this.musicRepository.create(file, createMusicDto);
  }

  async findAll() {
    return await this.musicRepository.findAll();
  }


  async findOne(id: number, userId: number, musicId: number) {
    const music = await this.musicRepository.findOne(id);
   
    if (!music) {
      throw new NotFoundException('Music not found');
    } else {
      await this.listenRepository.create(userId, musicId);
      return music;
      ;
    }
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }
}
