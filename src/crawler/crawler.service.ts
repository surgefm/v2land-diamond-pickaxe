import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FindOneSiteDto } from 'src/site/dto/find-one-site.dto';
import { Site } from 'src/site/site.entity';
import { SiteService } from 'src/site/site.service';
import { Url } from 'url';

@Injectable()
export abstract class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);
  sitePromise: Promise<Site>;
  constructor(
    public name: string,
    public source: Url,
    private readonly siteService: SiteService
  ) {
    const findOneSiteDto = new FindOneSiteDto();
    findOneSiteDto.name = this.name;
    this.sitePromise = this.siteService.findOne(findOneSiteDto);
  }
  abstract async crawl(): Promise<void>;

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
