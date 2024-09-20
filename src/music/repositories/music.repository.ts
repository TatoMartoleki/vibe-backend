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
    private musicReposiotry: Repository<MusicEntity>,
  ) {}

  async create(file: FileEntity, createMusicDto: CreateMusicDto): Promise<MusicEntity> {
    const album = this.musicReposiotry.create({
      ...createMusicDto,
      file: file,
      duration: Number(createMusicDto.duration)
    });
    return await this.musicReposiotry.save(album);
  }

  async findAll() {
    return await this.musicReposiotry
    .createQueryBuilder()
    .select()
    .getMany();
  }

  async findOne(id: number) {
    return await this.musicReposiotry
      .createQueryBuilder()
      .select('music')
      .from(MusicEntity, 'music')
      .where('music.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicReposiotry
      .createQueryBuilder('music')
      .update()
      .set(updateMusicDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.musicReposiotry
      .createQueryBuilder()
      .delete()
      .from(MusicEntity)
      .where('id = :id', { id })
      .execute();
  }


  async findByName(search: string){
    return await this.musicReposiotry
    .createQueryBuilder('music')
    .where('music.name LIKE :search', {search: `%${search}%`})
    .getMany()
  }
}
