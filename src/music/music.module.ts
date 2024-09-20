import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './repositories/music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { ListenModule } from 'src/listen/listen.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity]), ListenModule],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicRepository]
})
export class MusicModule {}
