import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Site } from 'src/site/site.entity';
import { SiteService } from '../site/site.service';

@Injectable()
export abstract class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  constructor(private readonly siteService: SiteService) {}
  abstract async crawl(site: Site): Promise<void>;

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | month
  // | | | day of month
  // | | hour
  // | minute
  // second (optional)
  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    this.logger.debug('Crawler corn task started');
    this.crawl();
  }
}
