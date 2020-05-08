import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Site } from 'src/site/site.entity';
import { CrawlerService } from '../crawler/crawler.service';
import { SiteService } from '../site/site.service';

@Injectable()
export class RSSCrawlerService extends CrawlerService {
  constructor(
    public site: Site,
    siteService: SiteService,
    @InjectQueue('crawler') crawlerQueue: Queue
  ) {
    super(siteService, crawlerQueue);
  }
}
