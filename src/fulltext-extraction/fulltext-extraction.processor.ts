import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import * as Mercury from '@postlight/mercury-parser';
import { Job } from 'bull';
import { CreateArticleDto } from '../article/dto/create-article.dto';

@Processor('fulltext-extration')
export class FulltextExtractionProcessor {
  private readonly logger = new Logger(FulltextExtractionProcessor.name);

  @Process()
  async parsePage(job: Job): Promise<CreateArticleDto> {
    this.logger.debug('Start parsing page...');

    let article: CreateArticleDto = job.data;
    let parsed = await Mercury.parse(article.url, { html: article.html });
    article.title = article.title || parsed.title;
    article.content = article.content || parsed.content;
    article.author = article.author || parsed.author;
    article.time = article.time || new Date(parsed.date_published);
    article.abstract = article.abstract || parsed.excerpt;
    // TODO: Screenshot
    // TODO: Wayback machine

    this.logger.debug('Parsing completed');
    return article;
  }
}
