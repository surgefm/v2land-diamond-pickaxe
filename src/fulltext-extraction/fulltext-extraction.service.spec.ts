import { Test, TestingModule } from '@nestjs/testing';
import { FulltextExtractionService } from './fulltext-extraction.service';

describe('FulltextExtraction', () => {
  let provider: FulltextExtractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FulltextExtractionService],
    }).compile();

    provider = module.get<FulltextExtractionService>(FulltextExtractionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
