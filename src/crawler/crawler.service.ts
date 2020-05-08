import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { SiteService } from '../site/site.service';

@Injectable()
export abstract class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(
    private readonly siteService: SiteService,
    public crawlerQueue: Queue
  ) {}

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | month
  // | | | day of month
  // | | hour
  // | minute
  // second (optional)
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Crawler corn task started');
    const siteList = await this.siteService.getAll();
    for (const site of siteList) {
      this.crawlerQueue.add(site);
    }
  }
}
