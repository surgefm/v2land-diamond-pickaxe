import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CrawlerService } from '../crawler/crawler.service';
import { SiteService } from '../site/site.service';

@Injectable()
export class RSSCrawlerService extends CrawlerService {
  constructor(
    siteService: SiteService,
    @InjectQueue('crawler') crawlerQueue: Queue
  ) {
    super(siteService, crawlerQueue);
  }
}
