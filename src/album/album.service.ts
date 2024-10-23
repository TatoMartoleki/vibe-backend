import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create(file: FileEntity, createAlbumDto: CreateAlbumDto, artistId: number) {
    return await this.albumRepository.create(file, createAlbumDto, artistId);
  }

  async getMusicFromAlbum(albumId: number){
    return await this.albumRepository.getMusicFromAlbum(albumId)
  }

  async getTopAlbum(){
    return await this.albumRepository.getTopAlbum()
  }

  async findAll(limit?: number, offset?: number) {
    return await this.albumRepository.findAll(limit, offset);
  }

  async findOne(id: number) {
    return await this.albumRepository.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumRepository.remove(id);
  }

  async uploadedFile() {}
}
