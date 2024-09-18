import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repositories/album.repository';
import { FileEntity } from 'src/files/entities/file.entity';
import { AlbumEntity } from 'src/album/entities/album.entity'; // Add this import


@Injectable()
export class AlbumService {

  constructor(private readonly albumRepository: AlbumRepository){}

  async create(file: FileEntity, createAlbumDto: CreateAlbumDto) {
    //console.log('This is a file', file)
    return await this.albumRepository.create(file, createAlbumDto);
  }

  // async create(file: Express.Multer.File, createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
  //   // Assume fileService.uploadFile returns an object with URL and other file details
  //   const uploadedFile = await this.fileService.uploadFile(file);
    
  //   // Create a new FileEntity from the upload result
  //   const fileEntity = new FileEntity();
  //   fileEntity.url = uploadedFile.url; // Adjust according to actual properties
  //   fileEntity.key = uploadedFile.key;
  //   fileEntity.bucket = uploadedFile.bucket;
  //   fileEntity.fileName = file.originalname;

  //   // Save the file entity
  //   const savedFile = await this.albumRepository.fileRepo.save(fileEntity);

  //   // Create the album with the saved file
  //   return await this.albumRepository.create(savedFile, createAlbumDto);
  // }

  async findAll() {
    return await this.albumRepository.findAll();
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

  async uploadedFile(){

  }
}
