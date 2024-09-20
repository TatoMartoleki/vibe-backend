import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { title } from 'process';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumrepository: Repository<AlbumEntity>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .insert()
      .values(createAlbumDto)
      .execute();
  }

  async findAll() {
    return await this.albumrepository
    .createQueryBuilder('album')
    .getMany();
  }

  async findOne(id: number) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .where('album.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .update(AlbumEntity)
      .set(updateAlbumDto)
      .where('album.id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .delete()
      .from(AlbumEntity)
      .where('album.id = :id', { id })
      .execute();
  }

  async findByName(search: string){
    return await this.albumrepository
    .createQueryBuilder('album')
    .where('album.title LIKE :search', {search: `%${search}%`})
    .getMany()
  }
}
