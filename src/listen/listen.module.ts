import { Module } from '@nestjs/common';
import { ListenService } from './listen.service';
import { ListenController } from './listen.controller';
import { ListenRepository } from './repositories/listen.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenEntity } from './entities/listen.entity';
import { AuthorModule } from 'src/author/author.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListenEntity]), AuthorModule, AlbumModule],
  controllers: [ListenController],
  providers: [ListenService, ListenRepository],
  exports: [ListenRepository],
})
export class ListenModule {}
