import { Repository } from 'typeorm';
import { ListenEntity } from '../entities/listen.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateListenDto } from '../dto/update-listen.dto';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AuthorRepository } from 'src/author/repositories/author.repository';
import { AlbumRepository } from 'src/album/repositories/album.repository';

@Injectable()
export class ListenRepository {
  constructor(
    @InjectRepository(ListenEntity)
    private readonly listenRepository: Repository<ListenEntity>,
    private readonly authorRepository: AuthorRepository,
    private readonly albumRepository: AlbumRepository,
  ) { }

  async create(userId: number, musicId: number) {
    const lastRecord = await this.listenRepository.findOne({
      where: { user: { id: userId }, music: { id: musicId } },
      order: { createdAt: 'DESC' },
    });


    if(musicId){
      const record = new ListenEntity()
    }
    
    const record = new ListenEntity();
    record.userId = userId;
    record.musicId = musicId;

    const currentTime = new Date();

    if (!lastRecord) {
      record.counter = 1;
    } else {  
      const timeDifference = currentTime.getTime() - lastRecord.createdAt.getTime();
        record.counter = lastRecord.counter + 1;
    }

    const artist = await this.listenRepository.manager.findOne(MusicEntity, {
      where: { id: musicId },
      relations: ['artist'],
    });

    const album = await this.listenRepository.manager.findOne(MusicEntity, {
      where: { id: musicId },
      relations: ['album'],
    });

    if (album && album.album) {
      await this.albumRepository.incrementListenCount(album.album.id);
    }

    if (artist && artist.artist) {
      await this.authorRepository.incrementListenCount(artist.artist.id);
    }

    return await this.listenRepository.save(record);
  }

  async findAll() {
    return await this.listenRepository.createQueryBuilder().select().getMany();
  }

  async findOne(id: number) {
    return await this.listenRepository
      .createQueryBuilder()
      .select('listen')
      .from(ListenEntity, 'listen')
      .where('listen.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateListenDto: UpdateListenDto) {
    return await this.listenRepository
      .createQueryBuilder('listen')
      .update()
      .set(updateListenDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.listenRepository
      .createQueryBuilder()
      .delete()
      .from(ListenEntity)
      .where('id = :id', { id }).execute;
  }
}
