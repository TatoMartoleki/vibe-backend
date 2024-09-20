import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { AlbumRepository } from './repositories/album.repository';
import { FilesModule } from 'src/files/files.module';
import { FilesService } from 'src/files/files.service';
import { FilesRepository } from 'src/files/files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity]), FilesModule],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  exports: [AlbumRepository]
})
export class AlbumModule {}
