import { forwardRef, Module } from '@nestjs/common';
import { ListenService } from './listen.service';
import { ListenController } from './listen.controller';
import { ListenRepository } from './repositories/listen.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenEntity } from './entities/listen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListenEntity]) ],
  controllers: [ListenController],
  providers: [ListenService, ListenRepository],
  exports: [ListenRepository],
})
export class ListenModule {}
