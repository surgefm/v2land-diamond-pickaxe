import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';
import { SiteService } from '../site/site.service';

/**
 * Crawler working with RSS sources. Should never be directly revoked.
 */
@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private siteService: SiteService,
    @InjectQueue('crawler') private crawlerQueue: Queue
  ) {
    const interval = this.schedulerRegistry.getInterval('periodicCrawling');
    if (interval !== null && interval !== undefined) {
      this.addInterval(
        'periodicCrawling',
        this.configService.get<number>('CRAWLER_INTERVAL')
      );
    }
  }

  /**
   * Set period of a Cron job. Used in setting periodic crawling
   */
  addInterval(name: string, seconds: number) {
    const callback = () => {
      this.logger.warn(`Interval ${name} executing at time (${seconds})!`);
    };

    const interval = setInterval(callback, seconds);
    this.schedulerRegistry.addInterval(name, interval);
  }

  /**
   * Periodically add all recorded sites to the crawler queue.
   */
  @Cron(CronExpression.EVERY_HOUR, { name: 'periodicCrawling' })
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
