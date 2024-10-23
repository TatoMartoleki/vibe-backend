import { Injectable } from '@nestjs/common';
import { UpdateListenDto } from './dto/update-listen.dto';
import { ListenRepository } from './repositories/listen.repository';

@Injectable()
export class ListenService {

  constructor(private readonly listenRepository: ListenRepository){}

  async create(userId: number, musicId: number) {
    return await this.listenRepository.create(userId, musicId)
  }

  findAll() {
    return this.listenRepository.findAll();
  }

  findOne(id: number) {
    return this.listenRepository.findOne(id);
  }

  update(id: number, updateListenDto: UpdateListenDto) {
    return this.listenRepository.update(id, updateListenDto);
  }

  remove(id: number) {
    return this.listenRepository.remove(id);
  }
}
