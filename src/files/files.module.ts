import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports:[TypeOrmModule.forFeature([FileEntity]), AwsModule],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  exports: [FilesService, FilesRepository]
})
export class FilesModule {}
