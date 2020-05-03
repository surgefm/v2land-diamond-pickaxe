import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Output as Feed } from 'rss-parser';
import { ArticleService } from 'src/article/article.service';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { EnqueueUrlService } from 'src/enqueue-url/enqueue-url';
import { FindOneSiteDto } from 'src/site/dto/find-one-site.dto';
import { Site } from 'src/site/site.entity';
import { SiteService } from 'src/site/site.service';
import { Connection } from 'typeorm';
import { parse as parseUrl, Url } from 'url';
import { CrawlerService } from '../crawler/crawler.service';
import { Article } from 'src/article/article.entity';

@Injectable()
export class RSSCrawlerService extends CrawlerService {
  site: Promise<Site>;
  constructor(
    public name: string,
    public source: Url,
    private connection: Connection,
    private readonly enqueueUrlService: EnqueueUrlService,
    private readonly articleService: ArticleService
  ) {
    super(name, source);
    const findOneSiteDto = new FindOneSiteDto();
    findOneSiteDto.name = name;
    const siteService = new SiteService(connection.getRepository(Site));
    this.site = siteService.findOne(findOneSiteDto);
  }
  async getFeed() {
    const rssParser = new Parser();
    const feed: Feed = await rssParser.parseURL(this.source.href);

    return feed;
  }
  async crawl() {
    //   Get feed object
    const feed = await this.getFeed();

    // Generate article DTO array
    const sourceSite = new FindOneSiteDto();
    sourceSite.name = feed.title;
    const site = await this.site;
    let articles: Article[] = [];
    for (const articleInFeed of feed.items) {
      const article = new Article();
      article.url = articleInFeed.link;
      article.content = articleInFeed.content;
      article.siteId = site;
      article.title = articleInFeed.title;
      article.time = new Date(articleInFeed.pubDate);
      articles.push(article);
    }

    // Enqueue for fulltext extraction
    if (site.needParseFulltext) {
      for (const article of articles) {
        this.enqueueUrlService.enqueue(parseUrl(article.url));
      }
    } else {
      for (const article of articles) {
        await this.articleService.create(article);
      }
    }
  }
}
