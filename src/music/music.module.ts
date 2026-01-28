import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './repositories/music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { FilesModule } from '../files/files.module';
import { ListenModule } from '../listen/listen.module';
import { AuthorModule } from '../author/author.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity]), FilesModule, ListenModule, AuthorModule, AlbumModule],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicRepository, MusicRepository]
})
export class MusicModule {}
