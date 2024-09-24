import { Test, TestingModule } from '@nestjs/testing';
import { TopMusicService } from './top-music.service';

describe('TopMusicService', () => {
  let service: TopMusicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopMusicService],
    }).compile();

    service = module.get<TopMusicService>(TopMusicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
