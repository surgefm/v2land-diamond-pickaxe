import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';
import { SiteService } from '../site/site.service';

/**
 * Crawler working with RSS sources. Should never be directly revoked.
 */
@Injectable()
export class CrawlerService implements OnModuleInit {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private configService: ConfigService,
    private siteService: SiteService,
    @InjectQueue('crawler') private crawlerQueue: Queue
  ) {}

  /**
   * Set a period crawling job accroding to the config.
   */
  public onModuleInit(): void {
    const ms = this.configService.get<number>('CRAWLER_INTERVAL');
    this.logger.warn(`Interval executing at time (${ms})!`);
    // Periodically add all recorded sites to the crawler queue
    const interval = setInterval(this.crawling, ms);
    this.schedulerRegistry.addInterval('periodic-crawling', interval);
  }

  /**
   * Add all recorded sites to the crawler queue.
   */
  async crawling() {
    this.logger.debug('Corn task of Crawler started');
    const siteList = await this.siteService.getAll();
    for (const site of siteList) {
      // Only updates those subscribed
      if (
        site.rssUrls !== null &&
        site.rssUrls !== undefined &&
        site.rssUrls.length > 0
      ) {
        this.logger.debug(
          `${site.name}:${site.rssUrls} ${typeof site.rssUrls} is enqueued`
        );
        await this.crawlerQueue.add(site);
      }
    }
  }
}
