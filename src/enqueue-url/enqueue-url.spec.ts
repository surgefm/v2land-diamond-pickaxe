import { Test, TestingModule } from '@nestjs/testing';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

describe('EnqueueUrlService', () => {
  let provider: EnqueueUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnqueueUrlController],
      providers: [EnqueueUrlService],
      imports: [FulltextExtractionModule],
      exports: [EnqueueUrlService],
    }).compile();

    provider = module.get<EnqueueUrlService>(EnqueueUrlService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
