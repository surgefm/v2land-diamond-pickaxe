import { Injectable } from '@nestjs/common';
import Parser, { Output as Feed } from 'rss-parser';
import { Site } from 'src/site/site.entity';
import { parse as parseUrl } from 'url';
import { AbstractGenerationService } from '../abstract-generation/abstract-generation.service';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { CrawlerService } from '../crawler/crawler.service';
import { EnqueueUrlService } from '../enqueue-url/enqueue-url';
import { SiteService } from '../site/site.service';

@Injectable()
export class RSSCrawlerService extends CrawlerService {
  constructor(
    public site: Site,
    private readonly enqueueUrlService: EnqueueUrlService,
    private readonly articleService: ArticleService,
    private readonly abstractGenerationService: AbstractGenerationService,
    siteService: SiteService
  ) {
    super(siteService);
  }
  async getFeed(site: Site) {
    const rssParser = new Parser();
    const feed: Feed = await rssParser.parseURL(site.url);

    return feed;
  }

  async getArticleCandidateList(site: Site): Promise<CreateArticleDto[]> {
    //   Get feed object
    const feed = await this.getFeed(site);
    // Generate article DTO array
    let articles: CreateArticleDto[] = [];
    for (const articleInFeed of feed.items) {
      const article = new Article();
      article.url = articleInFeed.link;
      article.content = site.shouldParseFulltext ? null : articleInFeed.content;
      article.site = site;
      article.title = articleInFeed.title;
      article.time = new Date(articleInFeed.pubDate);
      article.abstract = site.shouldParseFulltext
        ? articleInFeed.content
        : this.abstractGenerationService.generateAbstract(
            articleInFeed.content
          );
    }
    return articles;
  }

  async crawl(site: Site) {
    const articles = await this.getArticleCandidateList(site);

    // Enqueue for fulltext extraction
    if (site.shouldParseFulltext) {
      // Extract fulltext
      for (const article of articles) {
        this.enqueueUrlService.enqueue(parseUrl(article.url));
      }
    } else {
      // Directly save into database
      for (const article of articles) {
        this.articleService.create(article);
      }
    }
  }
}
