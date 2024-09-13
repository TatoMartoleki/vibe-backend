import { Injectable } from '@nestjs/common';
import { CreateListenDto } from './dto/create-listen.dto';
import { UpdateListenDto } from './dto/update-listen.dto';
import { ListenReposiotry } from './repositories/listen.repository';

@Injectable()
export class ListenService {

  constructor(private readonly listenRepository: ListenReposiotry){}

  async create(createListenDto: CreateListenDto) {
    return await this.listenRepository.create(createListenDto)
  }

  findAll() {
    return `This action returns all listen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listen`;
  }

  update(id: number, updateListenDto: UpdateListenDto) {
    return `This action updates a #${id} listen`;
  }

  remove(id: number) {
    return `This action removes a #${id} listen`;
  }
}
