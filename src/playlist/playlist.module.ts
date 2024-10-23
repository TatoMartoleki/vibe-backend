import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './repositories/playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicModule } from 'src/music/music.module';
import { UsersModule } from 'src/users/users.module';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, UserEntity]), UsersModule, MusicModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
  exports: [PlaylistRepository]
})
export class PlaylistModule {}
