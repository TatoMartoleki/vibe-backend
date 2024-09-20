import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './repositories/music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity]), FilesModule],
  controllers: [MusicController],
  providers: [MusicService, MusicRepository],
  exports: [MusicRepository]
})
export class MusicModule {}
