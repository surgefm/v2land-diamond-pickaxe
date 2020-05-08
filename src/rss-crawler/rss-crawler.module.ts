import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AbstractGenerationModule } from '../abstract-generation/abstract-generation.module';
import { FulltextExtrationModule } from '../fulltext-extration/fulltext-extration.module';
import { RSSCrawlerService } from './rss-crawler.service';

@Module({
  providers: [RSSCrawlerService],
  imports: [
    FulltextExtrationModule,
    AbstractGenerationModule,
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
