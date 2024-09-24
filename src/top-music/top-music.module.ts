import { Module } from '@nestjs/common';
import { TopMusicService } from './top-music.service';
import { TopMusicController } from './top-music.controller';
import { TopMusicRepository } from './repositories/top-music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopMusicEntity } from './entities/top-music.entity';
import { ListenEntity } from 'src/listen/entities/listen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListenEntity])],
  controllers: [TopMusicController],
  providers: [TopMusicService, TopMusicRepository],
})
export class TopMusicModule {}
