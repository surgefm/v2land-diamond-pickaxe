import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { SiteService } from '../site/site.service';

/**
 * Crawler working with RSS sources. Should never be directly revoked.
 */
@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(
    private readonly siteService: SiteService,
    @InjectQueue('crawler') private crawlerQueue: Queue
  ) {}

  /**
   * Periodically add all recorded sites to the crawler queue.
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Corn task of Crawler started');
    const siteList = await this.siteService.getAll();
    for (const site of siteList) {
      // Only updates those subscribed
      if (site.url !== null && site.url !== undefined && site.url !== '') {
        this.logger.debug(
          `${site.name}:${site.url} ${typeof site.url} is enqueued`
        );
        await this.crawlerQueue.add(site);
      }
    }
  }
}
