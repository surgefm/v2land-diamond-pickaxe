import { Module } from '@nestjs/common';
import { AbstractGenerationModule } from 'src/abstract-generation/abstract-generation.module';
import { FulltextExtrationModule } from 'src/fulltext-extration/fulltext-extration.module';
import { RSSCrawlerService } from './rss-crawler.service';

@Module({
  providers: [RSSCrawlerService],
  imports: [FulltextExtrationModule, AbstractGenerationModule],
})
export class RSSCrawlerModule {}
