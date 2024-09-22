import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './repositories/author.repository';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class AuthorService {

  constructor(private readonly authorRepository: AuthorRepository) {

  }

  async create(file: FileEntity, createAuthorDto: CreateAuthorDto) {
    //console.log('This is a file', file)
    return await this.authorRepository.create(file, createAuthorDto);
  }

  // async create(createAuthorDto: CreateAuthorDto) {
  //   return await this.authorRepository.create(createAuthorDto);
  // }

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne(id);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.update(id, updateAuthorDto);
  }

  async remove(id: number) {
    return await this.authorRepository.remove(id);
  }
}
