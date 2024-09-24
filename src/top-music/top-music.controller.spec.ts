import { Test, TestingModule } from '@nestjs/testing';
import { TopMusicController } from './top-music.controller';
import { TopMusicService } from './top-music.service';

describe('TopMusicController', () => {
  let controller: TopMusicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopMusicController],
      providers: [TopMusicService],
    }).compile();

    controller = module.get<TopMusicController>(TopMusicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
