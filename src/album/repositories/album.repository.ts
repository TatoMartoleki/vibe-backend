import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumrepository: Repository<AlbumEntity>,
  ) { }

  async create(
    file: FileEntity,
    createAlbumDto: CreateAlbumDto,
    artistId: number,
  ): Promise<AlbumEntity> {
    const album = this.albumrepository.create({
      ...createAlbumDto,
      authorId: artistId,
      file: file,
    });
    return await this.albumrepository.save(album);
  }

  async getMusicFromAlbum(albumId: number) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'music')
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('album.file', 'file')
      .where('album.id = :albumId', { albumId })
      .getOne()
  }

  async getTopAlbum() {
    return await this.albumrepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect("album.musics", "musics")
      .leftJoinAndSelect("album.author", "author")
      .orderBy('album.totalListenCount', 'DESC')
      .getMany();

  }

  async findAll() {
    return await this.albumrepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.author', 'author')
      .orderBy('album.createdAt', "DESC")
      .getMany();
  }

  async findOne(id: number) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('musics.photo', 'photo')
      .leftJoinAndSelect('musics.url', 'url')
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

  async findByName(search: string) {
    return await this.albumrepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .where('album.title LIKE :search', { search: `%${search}%` })
      .getMany();
  }

  async incrementListenCount(albumId: number) {
    await this.albumrepository
      .createQueryBuilder()
      .update(AlbumEntity)
      .set({ totalListenCount: () => 'totalListenCount + 1' })
      .where('id = :albumId', { albumId })
      .execute();
  }
}
