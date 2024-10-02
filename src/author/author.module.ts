import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { AuthorRepository } from './repositories/author.repository';
import { FileEntity } from 'src/files/entities/file.entity';
import { FilesModule } from 'src/files/files.module';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, AlbumEntity, MusicEntity]), FilesModule],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorRepository]

})
export class AuthorModule {}
