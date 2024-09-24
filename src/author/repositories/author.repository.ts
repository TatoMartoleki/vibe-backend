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

  async create(file: FileEntity, createAuthorDto: CreateAuthorDto): Promise<AuthorEntity> {
    const album = this.authorRepositoy.create({
      ...createAuthorDto,
      file: file
    });
    return await this.authorRepositoy.save(album);
  }

  async findAll() {
    return await this.authorRepositoy
    .createQueryBuilder('author')
    .leftJoinAndSelect('author.file', 'file')
    .getMany();
  }

  async findOne(id: number) {
    return await this.authorRepositoy
      .createQueryBuilder()
      .leftJoinAndSelect('author.file', 'file')
      .where('id = :id', { id })
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

  async findByName(search: string){
    return await this.authorRepositoy
    .createQueryBuilder('author')
    .leftJoinAndSelect('author.file', 'file') 
    .where('author.firstName LIKE :search', {search: `%${search}%`})
    .getMany()
  }
}
