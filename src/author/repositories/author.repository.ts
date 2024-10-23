import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import {  Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>
  ) { }

  async create(
    file: FileEntity,
    createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    const album = this.authorRepository.create({
      ...createAuthorDto,
      file: file,
    });
    return await this.authorRepository.save(album);
  }

  async getTopArtists() {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .orderBy('author.totalListenCount', 'DESC')
      .getMany();
  }
  async recentlyMusic() {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .orderBy('author.createdAt', 'DESC')
      .getMany();
  }

  async findAll(limit?: number, offset?: number) {
    const query = this.authorRepository.createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .leftJoinAndSelect('author.musics', 'musics')
      .leftJoinAndSelect('author.albums', 'albums');
  
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
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .leftJoinAndSelect('author.musics', 'musics')
      .leftJoinAndSelect('author.albums', 'albums')
      .leftJoinAndSelect('albums.file', 'albumfile')
      .leftJoinAndSelect('musics.url', 'musicUrl')
      .leftJoinAndSelect('musics.photo', 'musicPhoto')
      .where('author.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .update()
      .set(updateAuthorDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    const authorWithRelations = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.albums', 'albums')
      .leftJoinAndSelect('albums.musics', 'musics')
      .where('author.id = :id', { id })
      .getOne();


    if (!authorWithRelations) {
      throw new BadRequestException('Author not found');
    }

    const albumIds = authorWithRelations.albums.map(album => album.id);

    if (albumIds.length > 0) {
      await this.musicRepository
        .createQueryBuilder()
        .delete()
        .from(MusicEntity)
        .where('albumId IN (:...albumIds)', { albumIds })
        .execute();
    }

    await this.albumRepository
      .createQueryBuilder()
      .delete()
      .from(AlbumEntity)
      .where('authorId = :authorId', { authorId: id })
      .execute();

    return await this.authorRepository
      .createQueryBuilder()
      .delete()
      .from(AuthorEntity)
      .where('id = :id', { id })
      .execute();
  }

  async findByName(search: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .leftJoinAndSelect('author.musics', 'musics')
      .leftJoinAndSelect('author.albums', 'albums')
      .where('author.firstName LIKE :search', { search: `%${search}%` })
      .getMany();
  }
  async incrementListenCount(artistId: number) {
    await this.authorRepository
      .createQueryBuilder()
      .update(AuthorEntity)
      .set({ totalListenCount: () => 'totalListenCount + 1' })
      .where('id = :artistId', { artistId })
      .execute();
  }
}
