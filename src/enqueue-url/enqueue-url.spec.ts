import { Test, TestingModule } from '@nestjs/testing';
import { FulltextExtrationModule } from '../fulltext-extration/fulltext-extration.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

describe('EnqueueUrlService', () => {
  let provider: EnqueueUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnqueueUrlController],
      providers: [EnqueueUrlService],
      imports: [FulltextExtrationModule],
      exports: [EnqueueUrlService],
    }).compile();

    provider = module.get<EnqueueUrlService>(EnqueueUrlService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
