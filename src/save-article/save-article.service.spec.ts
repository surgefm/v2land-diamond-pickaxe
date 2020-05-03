import { Test, TestingModule } from '@nestjs/testing';
import { SaveArticleService } from './save-article.service';

describe('SaveArticle', () => {
  let provider: SaveArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaveArticleService],
    }).compile();

    provider = module.get<SaveArticleService>(SaveArticleService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
