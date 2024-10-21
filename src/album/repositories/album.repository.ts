import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { Like, Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(MusicEntity)
    private musicRepostiory: Repository<MusicEntity>
  ) { }

  async create(
    file: FileEntity,
    createAlbumDto: CreateAlbumDto,
    artistId: number,
  ): Promise<AlbumEntity> {
    const album = this.albumRepository.create({
      ...createAlbumDto,
      authorId: artistId,
      file: file,
    });
    return await this.albumRepository.save(album);
  }

  async getMusicFromAlbum(albumId: number) {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'music')
      .leftJoinAndSelect("music.url", "url")
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('album.file', 'file')
      .where('album.id = :albumId', { albumId })
      .getOne()
  }

  async getTopAlbum() {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect("music.url", "url")
      .leftJoinAndSelect("album.musics", "musics")
      .leftJoinAndSelect("album.author", "author")
      .orderBy('album.totalListenCount', 'DESC')
      .getMany();

  }

  async findAll(limit?: number, offset?: number) {
    const query = this.albumRepository.createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.author', 'author')
      .orderBy('album.createdAt', 'DESC');
  
    if (limit !== undefined) {
      const limitNumber = Math.min(12, limit);
      query.limit(limitNumber);
    }
  
    if (offset !== undefined) {
      query.offset(offset);
    }
  
    return await query.getMany();
  }
  

  async findOne(id: number) {
    return await this.albumRepository
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
    return await this.albumRepository
      .createQueryBuilder('album')
      .update(AlbumEntity)
      .set(updateAlbumDto)
      .where('album.id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    const albumWithMusics = await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'musics')
      .where('album.id = :id', { id })
      .getOne();

    if (!albumWithMusics) {
      throw new BadRequestException('Album not found');
    }

    const musicIds = albumWithMusics.musics.map((music) => music.id);
    if (musicIds.length > 0) {
      await this.musicRepostiory
        .createQueryBuilder()
        .delete()
        .from(MusicEntity)
        .where('id IN (:...musicIds)', { musicIds })
        .execute();
    }

    return await this.albumRepository
      .createQueryBuilder()
      .delete()
      .from(AlbumEntity)
      .where('id = :id', { id })
      .execute();
  }


  async findByName(search: string) {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.file', 'file')
      .where('album.title LIKE :search', { search: `%${search}%` })
      .leftJoinAndSelect("album.musics", "musics")
      .getMany()
  }

  async incrementListenCount(albumId: number) {
    await this.albumRepository
      .createQueryBuilder()
      .update(AlbumEntity)
      .set({ totalListenCount: () => 'totalListenCount + 1' })
      .where('id = :albumId', { albumId })
      .execute();
  }
}
