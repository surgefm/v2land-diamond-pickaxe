import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { ArticleService } from 'src/article/article.service';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';

@Injectable()
export class FulltextExtrationService {
  constructor(
    @InjectQueue('fulltext-extration') private saveArticleQueue: Queue,
    private readonly articleService: ArticleService
  ) {}
  async save(candidateArticle: CreateArticleDto) {
    // The source doesn't provide fulltext
    if (candidateArticle.site.shouldParseFulltext) {
      // Archive dynamic page
      let job: Job<string> = await this.saveArticleQueue.add(
        'archive-dynamic-page',
        candidateArticle.url
      );
      candidateArticle.html = job.returnvalue;
    }

    // Parse Article
    let job: Job<CreateArticleDto> = await this.saveArticleQueue.add(
      'parse',
      candidateArticle
    );

    let parsedArticle = job.data;
    this.articleService.create(parsedArticle);
  }
}
