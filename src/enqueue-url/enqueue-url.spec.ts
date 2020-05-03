import { Test, TestingModule } from '@nestjs/testing';
import { EnqueueUrlService } from './enqueue-url';

describe('EnqueueUrlService', () => {
  let provider: EnqueueUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnqueueUrlService],
    }).compile();

    provider = module.get<EnqueueUrlService>(EnqueueUrlService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
