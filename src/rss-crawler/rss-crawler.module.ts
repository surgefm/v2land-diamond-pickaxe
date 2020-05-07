import { Module } from '@nestjs/common';
import { AbstractGenerationModule } from '../abstract-generation/abstract-generation.module';
import { FulltextExtrationModule } from '../fulltext-extration/fulltext-extration.module';
import { RSSCrawlerService } from './rss-crawler.service';

@Module({
  providers: [RSSCrawlerService],
  imports: [FulltextExtrationModule, AbstractGenerationModule],
})
export class RSSCrawlerModule {}
