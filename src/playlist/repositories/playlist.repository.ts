import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from '../dto/create-playlist.dto';
import { UpdatePlaylistDto } from '../dto/update-playlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistEntity } from '../entities/playlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectRepository(PlaylistEntity)
    private playlistRepository: Repository<PlaylistEntity>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistRepository
      .createQueryBuilder()
      .insert()
      .values(createPlaylistDto)
      .execute();
  }

  async findAll() {
    return await this.playlistRepository
      .createQueryBuilder()
      .select()
      .getMany();
  }

  async findOne(id: number) {
    return await this.playlistRepository
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository
      .createQueryBuilder()
      .update()
      .set(updatePlaylistDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.playlistRepository
      .createQueryBuilder()
      .delete()
      .from(PlaylistEntity)
      .where('id = :id', { id })
      .execute();
  }

  async findByName(search: string) {
    return this.playlistRepository
      .createQueryBuilder('playlist')
      .where('playlist.name LIKE  :search', { search: `%${search}%` })
      .getMany();
  }
}
