import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TopMusicService } from './top-music.service';
import { CreateTopMusicDto } from './dto/create-top-music.dto';
import { UpdateTopMusicDto } from './dto/update-top-music.dto';

@Controller('top-music')
export class TopMusicController {
  constructor(private readonly topMusicService: TopMusicService) {}

  @Get()
  async getTopMusic(@Query('limit') limit: number = 20){
    return await this.topMusicService.getTopMusic(limit)
  }

}
