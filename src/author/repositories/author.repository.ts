import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepositoy: Repository<AuthorEntity>,
  ) {}

  async create(
    file: FileEntity,
    createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorEntity> {
    const album = this.authorRepositoy.create({
      ...createAuthorDto,
      file: file,
    });
    return await this.authorRepositoy.save(album);
  }

  async getTopArtists() {
    return await this.authorRepositoy
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .orderBy('author.totalListenCount', 'DESC')
      .getMany();
  }
  async recentlyMusic() {
    return await this.authorRepositoy
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .orderBy('author.createdAt', 'DESC')
      .getMany();
  }

  async findAll() {
    return await this.authorRepositoy
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .leftJoinAndSelect("author.musics", "musics")
      .leftJoinAndSelect("author.albums", "albums")
      .getMany();
  }

  async findOne(id: number) {
    return await this.authorRepositoy
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .leftJoinAndSelect('author.musics', 'musics')
      .leftJoinAndSelect('author.albums', 'albums')
      .where('author.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepositoy
      .createQueryBuilder('author')
      .update()
      .set(updateAuthorDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.authorRepositoy
      .createQueryBuilder()
      .delete()
      .from(AuthorEntity)
      .where('id = :id', { id })
      .execute();
  }

  async findByName(search: string) {
    return await this.authorRepositoy
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.file', 'file')
      .leftJoinAndSelect('author.musics', 'musics')
      .leftJoinAndSelect('author.albums', 'albums')
      .where('author.firstName LIKE :search', { search: `%${search}%` })
      .getMany();
  }

  async incrementListenCount(artistId: number) {
    await this.authorRepositoy
      .createQueryBuilder()
      .update(AuthorEntity)
      .set({ totalListenCount: () => 'totalListenCount + 1' })
      .where('id = :artistId', { artistId })
      .execute();
  }
}
