import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';

@Injectable()
export class AlbumService {

  constructor(private readonly albumrepository: AlbumRepository){}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumrepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumrepository.findAll();
  }

  async findOne(id: number) {
    return await this.albumrepository.findOne(id);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumrepository.update(id, updateAlbumDto);
  }

  async remove(id: number) {
    return await this.albumrepository.remove(id);
  }
}
