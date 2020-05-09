import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { SiteService } from '../site/site.service';

/**
 * Manages the crawler queue and scheduler. All sites and articles share one queue.
 */
@Injectable()
export abstract class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(
    private readonly siteService: SiteService,
    public crawlerQueue: Queue
  ) {}

  /**
   * Periodically add all recorded sites to the crawler queue.
   */
  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Crawler corn task started');
    const siteList = await this.siteService.getAll();
    for (const site of siteList) {
      this.crawlerQueue.add(site);
    }
  }
}
