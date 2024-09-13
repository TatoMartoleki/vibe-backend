import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenEntity } from '../entities/listen.entity';
import { Repository } from 'typeorm';
import { CreateListenDto } from '../dto/create-listen.dto';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicRepository } from 'src/music/repositories/music.repository';
import { log } from 'console';

@Injectable()
export class ListenReposiotry {
  constructor(
    @InjectRepository(ListenEntity)
    private readonly listenRepository: Repository<ListenEntity>,
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
      setTimeout(async () => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - 1);

        if (music.updatedAt < date) {
          music.counter++;
          music.updatedAt = new Date();

          await this.listenRepository.save(music);
        }
      }, 60000);
    } else {
      const newMusic = this.listenRepository.create({
        musicId: musicId,
        counter: 1,
        updatedAt: new Date(),
      });
      return await this.listenRepository.save(newMusic);
    }
  }
}
