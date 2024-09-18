import { forwardRef, Module } from '@nestjs/common';
import { ListenService } from './listen.service';
import { ListenController } from './listen.controller';
import { listenRepository } from './repositories/listen.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenEntity } from './entities/listen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListenEntity]) ],
  controllers: [ListenController],
  providers: [ListenService, listenRepository],
  exports: [listenRepository],
})
export class ListenModule {}
