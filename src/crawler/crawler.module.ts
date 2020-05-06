import { Module } from '@nestjs/common';
import { RSSCrawlerService } from 'src/rss-crawler/rss-crawler.service';
import { CrawlerService } from './crawler.service';

const crawlerServiceProvider = [
  {
    provide: CrawlerService,
    useClass: RSSCrawlerService,
  },
];

@Module({ providers: crawlerServiceProvider })
export class CrawlerModule {}
