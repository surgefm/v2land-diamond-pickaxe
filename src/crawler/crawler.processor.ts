import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import Parser, { Output as Feed } from "rss-parser";
import { ArticleService } from "../article/article.service";
import { CreateArticleDto } from "../article/dto/create-article.dto";
import { EnqueueUrlService } from "../enqueue-url/enqueue-url.service";
import { Site } from "../site/site.entity";

@Processor("crawler")
export class CrawlerProcessor {
  private readonly logger = new Logger(CrawlerProcessor.name);

  constructor(
    private readonly enqueueUrlService: EnqueueUrlService,
    private readonly articleService: ArticleService
  ) {}

  async getFeeds(site: Site): Promise<Feed[]> {
    const rssParser = new Parser();
    this.logger.debug(`Getting feeds`);

    let feeds: Feed[];

    for (const url of site.rssUrls) {
      const feed: Feed = await rssParser.parseURL(url);
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
    feed: Feed
  ): Promise<CreateArticleDto[]> {
    //
    let articles: CreateArticleDto[] = [];
    for (const articleInFeed of feed.items) {
      const article = new CreateArticleDto();
      article.url = articleInFeed.link;
      article.site = site;
      article.title = articleInFeed.title;
      article.time = new Date(articleInFeed.pubDate);
      if (feed.shouldParseFulltext) {
        article.abstract = articleInFeed.content;
      } else {
        article.content = articleInFeed.content;
      }
      articles.push(article);
    }
    return articles;
  }

  async crawOneFeed(site: Site, feed: Feed) {
    const articles = await this.parseArticleCandidateList(site, feed);

    // Enqueue for fulltext extraction
    if (site.shouldParseFulltext) {
      this.logger.debug(`Should parse: ${site.name} ${articles.length}`);
      // Extract fulltext
      const promises = articles.map(async (article) => {
        this.logger.debug(`Saving: ${article.title}`);
        await this.enqueueUrlService.enqueue(article.url);
      });
    } else {
      this.logger.debug(`Don't parse: ${site.name}`);
      // Directly save into database
      const promises = articles.map(async (article) => {
        this.logger.debug(`Saving: ${article.title}`);
        await this.articleService.create(article);
      });
      await Promise.all(promises);
    }
  }

  @Process()
  async crawl(job: Job<Site>) {
    const site = job.data;
    this.logger.debug(`Crawling ${site.name}`);

    const feeds = await this.getFeeds(site);

    const promises = feeds.map(
      async (feed) => await this.crawOneFeed(site, feed)
    );
    await Promise.all(promises);
  }
}
