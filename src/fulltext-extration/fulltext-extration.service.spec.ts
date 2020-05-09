import { Test, TestingModule } from '@nestjs/testing';
import { FulltextExtrationService } from './fulltext-extration.service';

describe('FulltextExtration', () => {
  let provider: FulltextExtrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FulltextExtrationService],
    }).compile();

    provider = module.get<FulltextExtrationService>(FulltextExtrationService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
