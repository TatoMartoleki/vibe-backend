import { Repository } from 'typeorm';
import { ListenEntity } from '../entities/listen.entity';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateListenDto } from '../dto/create-listen.dto';
import { UpdateListenDto } from '../dto/update-listen.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { error } from 'console';

@Injectable()
export class listenRepository {

  constructor(@InjectRepository(ListenEntity)
  private readonly listenRepository: Repository<ListenEntity>) {
  }

  async create(userId: number, musicId: number) {
      const lastRecord = await this.listenRepository.findOne({
        where: { user: { id: userId }, music: { id: musicId } },
        order: { createdAt: 'DESC' },
      });


      const record = new ListenEntity();
      record.userId = userId
      record.musicId =musicId


      const currentTime = new Date();

      if (!lastRecord) {
        record.counter = 1;
      } else {
        const timeDifference = currentTime.getTime() - lastRecord.createdAt.getTime();
        if (timeDifference > 60 * 1000) {
          record.counter = lastRecord.counter + 1;
        } else {
          throw new ForbiddenException(`You cannot listen to this music again within ${60 - Math.floor(timeDifference / 1000)} seconds.`);
        }
      }
      return await this.listenRepository.save(record)
    } 


  async findAll() {
    return await this.listenRepository
      .createQueryBuilder()
      .select()
      .getMany()
  }

  async findOne(id: number) {
    return await this.listenRepository
      .createQueryBuilder()
      .select('listen')
      .from(ListenEntity, 'listen')
      .where('listen.id = :id', { id })
      .getOne()
  }

  async update(id: number, updateListenDto: UpdateListenDto) {
    return await this.listenRepository
      .createQueryBuilder('listen')
      .update()
      .set(updateListenDto)
      .where("id = :id", { id })
      .execute()
  }

  async remove(id: number) {
    return await this.listenRepository
      .createQueryBuilder()
      .delete()
      .from(ListenEntity)
      .where('id = :id', { id })
      .execute
  }
}