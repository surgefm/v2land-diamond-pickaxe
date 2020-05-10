import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Parser, { Output as Feed } from 'rss-parser';
import { Article } from '../article/article.entity';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { EnqueueUrlService } from '../enqueue-url/enqueue-url.service';
import { Site } from '../site/site.entity';

@Processor('crawler')
export class CrawlerProcessor {
  constructor(
    private readonly enqueueUrlService: EnqueueUrlService,
    private readonly articleService: ArticleService
  ) {}
  async getFeed(site: Site) {
    const rssParser = new Parser();
    const feed: Feed = await rssParser.parseURL(site.url);
    console.log(feed);

    return feed;
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
      const article = new Article();
      article.url = articleInFeed.link;
      article.site = site;
      article.title = articleInFeed.title;
      article.time = new Date(articleInFeed.pubDate);
      if (feed.shouldParseFulltext) {
        article.abstract = articleInFeed.content;
      } else {
        article.content = articleInFeed.content;
      }
    }
    return articles;
  }

  @Process()
  async crawl(job: Job<Site>) {
    const site = job.data;
    const feed = await this.getFeed(site);
    const articles = await this.parseArticleCandidateList(site, feed);

    // Enqueue for fulltext extraction
    if (site.shouldParseFulltext) {
      // Extract fulltext
      for (const article of articles) {
        this.enqueueUrlService.enqueue(article.url);
      }
    } else {
      // Directly save into database
      for (const article of articles) {
        this.articleService.create(article);
      }
    }
  }
}
