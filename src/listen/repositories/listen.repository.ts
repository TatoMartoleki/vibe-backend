import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenEntity } from '../entities/listen.entity';
import { Repository } from 'typeorm';
import { CreateListenDto } from '../dto/create-listen.dto';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicRepository } from 'src/music/repositories/music.repository';

@Injectable()
export class ListenReposiotry {
  constructor(
    @InjectRepository(ListenEntity)
    private readonly listenRepository: Repository<ListenEntity>
  ) {}

  async create(createListenDto: CreateListenDto) {
    return await this.listenRepository
      .createQueryBuilder()
      .insert()
      .values(createListenDto)
      .execute();
  }

  async listenCounter(musicId: number) {
    const music = await this.listenRepository.findOne({ where: { musicId } });

    if (music) {
      return await this.listenRepository
        .createQueryBuilder()
        .update(ListenEntity)
        .set({ counter: () => 'counter + 1' })
        .where('musicId = :musicId', { musicId })
        .execute()
    } else {
        const newMusic = this.listenRepository.create({
            musicId: musicId, counter: 1
        })
        return await this.listenRepository.save(newMusic)
    }
  }
}
