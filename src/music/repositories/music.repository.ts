import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MusicEntity } from '../entities/music.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) { }


  async create(photo: FileEntity, url: FileEntity, createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    const album = this.musicRepository.create({
      ...createMusicDto,
      photo,
      url,
      // duration: Number(createMusicDto.duration)
    });
    return await this.musicRepository.save(album);
  }

  async findAll() {
    return await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.photo', 'photo')
      .leftJoinAndSelect('music.url', 'url')
      .getMany();
  }

  async findOne(id: number) {
    return await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.photo', 'photo')
      .leftJoinAndSelect('music.url', 'url')
      .where('music.id = :id', { id })
      .getOne();
  }

  async recentlyMusic() {
    return await this.musicRepository
      .createQueryBuilder('music')
      .orderBy('music.createdAt', 'DESC')
      .leftJoinAndSelect('music.photo', 'photo')
      .leftJoinAndSelect('music.url', 'url')
      .getMany();
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository
      .createQueryBuilder('music')
      .update()
      .set(updateMusicDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.musicRepository
      .createQueryBuilder()
      .delete()
      .from(MusicEntity)
      .where('id = :id', { id })
      .execute();
  }


  async findByName(search: string) {
    return await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.file', 'file')
      .where('music.name LIKE :search', { search: `%${search}%` })
      .getMany()
  }

}

