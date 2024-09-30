import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './repositories/music.repository';
import { FileEntity } from 'src/files/entities/file.entity';
import { ListenRepository } from 'src/listen/repositories/listen.repository';
import { AlbumRepository } from 'src/album/repositories/album.repository';

@Injectable()
export class MusicService {
  constructor(
    private readonly musicRepository: MusicRepository,
    private readonly listenRepository: ListenRepository,
    private readonly albumRepository: AlbumRepository
  ) {}

  async create(
    mp3File: FileEntity,
    createMusicDto: CreateMusicDto,
    albumId: number
  ) {
    const album = await this.albumRepository.findOne(albumId)

    if(!album){
      throw new BadRequestException("Album doesn't exist")
    }

    return await this.musicRepository.create(album.file, mp3File, createMusicDto, albumId);
  }

  async topHitsOfTheWeek(){
    return await this.musicRepository.topHitsOfTheWeek()
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

  async recentlyMusic(){
    return await this.musicRepository.recentlyMusic()
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }

  async getTopMusic(){
    return await this.musicRepository.getTopMusic()
  }

  async getRandomMusic(){
    return await this.musicRepository.getRandomMusic()
  }
}
