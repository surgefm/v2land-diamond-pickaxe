import { Module } from '@nestjs/common';
import { RSSCrawlerService } from '../rss-crawler/rss-crawler.service';
import { CrawlerService } from './crawler.service';

export const crawlerServiceProviders = [
  {
    provide: CrawlerService,
    useClass: RSSCrawlerService,
  },
];

@Module({ providers: crawlerServiceProviders })
export class CrawlerModule {}
