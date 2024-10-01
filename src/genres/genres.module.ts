import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GenreRepository } from './repositories/genres.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from './entities/genre.entity';
import { MusicModule } from 'src/music/music.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity]), MusicModule, FilesModule],
  controllers: [GenresController],
  providers: [GenresService, GenreRepository],
})
export class GenresModule {}
