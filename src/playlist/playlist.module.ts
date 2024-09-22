import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './repositories/playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { MusicModule } from 'src/music/music.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity]), MusicModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
})
export class PlaylistModule {}
