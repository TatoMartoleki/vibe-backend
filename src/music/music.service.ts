import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './repositories/music.repository';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class MusicService {

  constructor(private readonly musicReposiotry: MusicRepository){}

  async create(file: FileEntity, createMusicDto: CreateMusicDto) {
    return await this.musicReposiotry.create(file, createMusicDto);
  }

  async findAll() {
    return await this.musicReposiotry.findAll();
  }

  async findOne(id: number) {
    return await this.musicReposiotry.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicReposiotry.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicReposiotry.remove(id);
  }
}
