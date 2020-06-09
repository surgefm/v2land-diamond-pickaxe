import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SchedulerRegistry, Interval } from "@nestjs/schedule";
import { Queue } from "bull";
import { SiteService } from "../site/site.service";

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
    @InjectQueue("crawler") private crawlerQueue: Queue
  ) {
    // // Set Corn according to interval in env
    // if (this.schedulerRegistry.getIntervals().length == 0) {
    //   this.setTaskSchedule(this.configService.get<number>("CRAWLER_INTERVAL"));
    // }
  }

  /**
   * Set period of a Cron job. Used in setting periodic crawling
   */
  setTaskSchedule(seconds: number) {
    this.logger.warn(`Interval executing at time (${seconds})!`);
    // Periodically add all recorded sites to the crawler queue.
    const crawlerCallback = async () => {
      this.logger.debug("Corn task of Crawler started");
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
    };

    const interval = setInterval(crawlerCallback, seconds);
    this.schedulerRegistry.addInterval("periodic-crawling", interval);
  }

  @Interval(10000)
  async crawling() {
    this.logger.debug("Corn task of Crawler started");
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
