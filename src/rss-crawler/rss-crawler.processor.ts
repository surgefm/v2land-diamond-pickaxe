import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Parser, { Output as Feed } from 'rss-parser';
import { AbstractGenerationService } from 'src/abstract-generation/abstract-generation.service';
import { Article } from 'src/article/article.entity';
import { ArticleService } from 'src/article/article.service';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { EnqueueUrlService } from 'src/enqueue-url/enqueue-url';
import { Site } from 'src/site/site.entity';
import { parse as parseUrl } from 'url';

@Processor('crawler')
export class CrawlerProcessor {
  constructor(
    private readonly enqueueUrlService: EnqueueUrlService,
    private readonly articleService: ArticleService,
    private readonly abstractGenerationService: AbstractGenerationService
  ) {}
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

  @Process()
  async crawl(job: Job<Site>) {
    const site = job.data;
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
