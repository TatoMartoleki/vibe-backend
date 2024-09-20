import { Test, TestingModule } from '@nestjs/testing';
import { ListenService } from './listen.service';

describe('ListenService', () => {
  let service: ListenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenService],
    }).compile();

    service = module.get<ListenService>(ListenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
