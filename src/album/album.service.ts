import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';
import { FileEntity } from 'src/files/entities/file.entity';
import { AlbumEntity } from 'src/album/entities/album.entity'; // Add this import


@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) { }

  async create(file: FileEntity, createAlbumDto: CreateAlbumDto, artistId: number) {
    //console.log('This is a file', file)
    return await this.albumRepository.create(file, createAlbumDto, artistId);
  }

  async getTopAlbum() {
    return await this.albumRepository.getTopAlbum()
  }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(id: number) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumRepository.remove(id);
  }

  async uploadedFile() { }
}
