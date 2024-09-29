import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMusicDto } from '../dto/create-music.dto';
import { UpdateMusicDto } from '../dto/update-music.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MusicEntity } from '../entities/music.entity';
import { FileEntity } from 'src/files/entities/file.entity';
import { AlbumRepository } from 'src/album/repositories/album.repository';
import { AuthorRepository } from 'src/author/repositories/author.repository';

@Injectable()
export class MusicRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
    private albumRepository: AlbumRepository,
    private authorRepository: AuthorRepository,
  ) {}

  async create(
    photo: FileEntity,
    url: FileEntity,
    createMusicDto: CreateMusicDto,
    artistId: number,
    albumId: number,
  ): Promise<MusicEntity> {
    const album = await this.albumRepository.findOne(albumId);
    const artist = await this.authorRepository.findOne(artistId);

    if (!album) {
      throw new BadRequestException("Album doesn't exist");
    }

    if (!artist) {
      throw new BadRequestException("Artist doesn't exist");
    }

    const music = this.musicRepository.create({
      ...createMusicDto,
      photo,
      url,
      album,
      artist,
      // duration: (createMusicDto.duration)
    });
    return await this.musicRepository.save(music);
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
      .leftJoinAndSelect('music.photo', 'photo')
      .leftJoinAndSelect('music.url', 'url')
      .orderBy('music.createdAt', 'DESC')
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
    const music = await this.musicRepository.findOne({ where: { id } });
    if (!music) {
      throw new Error('Music not found');
    }
    await this.musicRepository.remove(music);
  }

  async findByName(search: string) {
    return await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.photo', 'photo')
      .leftJoinAndSelect('music.url', 'url')
      .where('music.name LIKE :search', { search: `%${search}%` })
      .getMany();
  }

  async getTopMusic() {
    return await this.musicRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.listenCounter', 'listen')
      .select(['music', 'COUNT(listen.id) as listenCount'])
      .groupBy('music.id')
      .orderBy('listenCount', 'DESC')
      .getRawMany();
  }
}
