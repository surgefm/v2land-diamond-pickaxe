import { BullModule } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticleModule } from '../article/article.module';
import { EnqueueUrlModule } from '../enqueue-url/enqueue-url.module';
import { SiteModule } from '../site/site.module';
import { RSSCrawlerProcessor } from './rss-crawler.processor';
import { RSSCrawlerService } from './rss-crawler.service';

describe('RSSCrawlerService', () => {
  let service: RSSCrawlerService;

  beforeEach(async () => {
    const fakeProcessor = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [RSSCrawlerService, RSSCrawlerProcessor],
      imports: [
        SiteModule,
        EnqueueUrlModule,
        ArticleModule,
        BullModule.registerQueue({
          name: 'crawler',
          redis: {
            host: '0.0.0.0',
            port: 6379,
          },
          processors: [fakeProcessor],
        }),
      ],
    }).compile();

    service = module.get<RSSCrawlerService>(RSSCrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
