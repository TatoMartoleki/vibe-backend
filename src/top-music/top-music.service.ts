import { Injectable } from '@nestjs/common';
import { CreateTopMusicDto } from './dto/create-top-music.dto';
import { UpdateTopMusicDto } from './dto/update-top-music.dto';
import { TopMusicRepository } from './repositories/top-music.repository';

@Injectable()
export class TopMusicService {

  constructor(private readonly topMusicRepository: TopMusicRepository){

  }

  async getTopMusic(limit: number = 20){
    return await this.topMusicRepository.getTopMusic(limit)
  }
}
