import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Article } from 'src/article/article.entity';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class SaveArticleService {
  constructor(
    @InjectQueue('save-article') private saveArticleQueue: Queue,
    private readonly articleService: ArticleService
  ) {}
  async save(article: Article) {
    // The source doesn't provide fulltext
    if (article.siteId.needParseFulltext) {
      // Archive dynamic page
      let job: Job<string> = await this.saveArticleQueue.add(
        'archive-dynamic-page',
        article.url
      );
      article.html = job.returnvalue;
    }

    // Parse Article
    let job: Job<Article> = await this.saveArticleQueue.add('parse', article);

    let parsedArticle = await job.data;
    this.articleService.create(parsedArticle);
  }
}
