import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';
import { Output as Feed } from 'rss-parser';
import { Article } from 'src/article/article.entity';
import { Connection } from 'typeorm';
import { Url } from 'url';
import { CrawlerService } from '../crawler/crawler.service';

@Injectable()
export class RSSCrawlerService extends CrawlerService {
  constructor(public name: string, public source: Url, private connection: Connection) {
    super(name, source);
  }
  async getFeed() {
    const rssParser = new Parser();
    const feed: Feed = await rssParser.parseURL(this.source.href);

    return feed;
  }
  async crawl() {
    const feed = await this.getFeed();
    for (const articleInFeed of feed.items) {
      const article = new Article();
      article.url = articleInFeed.link;
      article.content = articleInFeed.content;
      article.sourceUrl = feed.feedUrl;
      article.title = articleInFeed.title;
      article.time = new Date(articleInFeed.pubDate);
      await this.connection.manager.save(article);
    }
  }
}
