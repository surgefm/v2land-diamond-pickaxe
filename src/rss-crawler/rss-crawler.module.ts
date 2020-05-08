import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { EnqueueUrlModule } from '../enqueue-url/enqueue-url.module';
import { SiteModule } from '../site/site.module';
import { RSSCrawlerProcessor } from './rss-crawler.processor';
import { RSSCrawlerService } from './rss-crawler.service';

@Module({
  providers: [RSSCrawlerService, RSSCrawlerProcessor],
  imports: [
    SiteModule,
    EnqueueUrlModule,
    ArticleModule,
    BullModule.registerQueue({
      name: 'crawler',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class RSSCrawlerModule {}
