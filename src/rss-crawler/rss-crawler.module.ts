import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FulltextExtrationModule } from '../fulltext-extration/fulltext-extration.module';
import { RSSCrawlerProcessor } from './rss-crawler.processor';
import { RSSCrawlerService } from './rss-crawler.service';

@Module({
  providers: [RSSCrawlerService, RSSCrawlerProcessor],
  imports: [
    FulltextExtrationModule,
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
