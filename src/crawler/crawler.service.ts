import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import Parser, { Output as Feed } from 'rss-parser';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { EnqueueUrlService } from '../enqueue-url/enqueue-url.service';
import { Site } from '../site/site.model';
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
    private readonly enqueueUrlService: EnqueueUrlService
  ) {}

  /**
   * Set a period crawling job accroding to the config.
   */
  public onModuleInit(): void {
    const ms = this.configService.get<number>('CRAWLER_INTERVAL');
    this.logger.warn(`Interval executing at time (${ms})!`);
    // Periodically add all recorded sites to the crawler queue
    const interval = setInterval(this.crawling.bind(this), ms);
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
        const feeds = await this.getFeeds(site);

        this.logger.debug(`${feeds.length} feeds parsed`);

        feeds.forEach(async feed => await this.crawlOneFeed(site, feed));
      }
    }
  }

  async getFeeds(site: Site): Promise<Feed<any>[]> {
    const rssParser = new Parser();
    this.logger.debug(`Getting feeds`);

    let feeds: Feed<any>[] = [];

    for (const url of site.rssUrls) {
      const feed = await rssParser.parseURL(url);
      this.logger.debug(
        `feed: ${feed.title}, article_count: ${feed.items.length}`
      );
      feeds.push(feed);
    }

    return feeds;
  }

  /**
   * Generate article DTO array
   * @param site The site to generate article list for
   * @param feed Feed object to parse from
   */
  async parseArticleCandidateList(
    site: Site,
    feed: Feed<any>
  ): Promise<CreateArticleDto[]> {
    //
    let articles: CreateArticleDto[] = [];
    for (const articleInFeed of feed.items) {
      this.logger.debug(articleInFeed.title);
      const article = new CreateArticleDto();
      article.url = articleInFeed.link;
      article.site = site;
      article.title = articleInFeed.title;
      article.time = new Date(articleInFeed.pubDate);
      article.author = articleInFeed.creator;

      if (site.shouldParseFulltext) {
        article.abstract = articleInFeed.content;
      } else {
        article.content = articleInFeed.content;
        article.abstract = articleInFeed.content.slice(0, 200);
        article.html = articleInFeed.content;
      }
      articles.push(article);
    }
    return articles;
  }

  async crawlOneFeed(site: Site, feed: Feed<any>) {
    const articles = await this.parseArticleCandidateList(site, feed);

    const promises = articles.map(async article => {
      this.logger.debug(`Saving: ${article.title}`);
      await this.enqueueUrlService.enqueue(article.url, article);
    });
    await Promise.all(promises);
  }
}
