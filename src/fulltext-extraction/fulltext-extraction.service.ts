import { Injectable, Logger } from '@nestjs/common';
import * as Mercury from '@postlight/mercury-parser';
import * as entities from 'entities';
import { CreateArticleDto } from '../article/dto/create-article.dto';

@Injectable()
export class FulltextExtractionService {
  private readonly logger = new Logger(FulltextExtractionService.name);

  constructor() {}

  async parsePage(
    candidateArticle: CreateArticleDto
  ): Promise<CreateArticleDto> {
    this.logger.debug('Start parsing page...');

    let parsed = await Mercury.parse(candidateArticle.url, {
      // Must encode to HTML entities to prevent mercury's encoding problems on CJK
      html: candidateArticle.html,
    });

    const html = entities.decodeXML(parsed.content);
    candidateArticle.title = candidateArticle.title || parsed.title;
    candidateArticle.content = candidateArticle.content || parsed.content;
    candidateArticle.author = candidateArticle.author || parsed.author;
    candidateArticle.time =
      candidateArticle.time || new Date(parsed.date_published);
    candidateArticle.abstract = candidateArticle.abstract || parsed.excerpt;
    // TODO: Screenshot
    // TODO: Wayback machine

    this.logger.debug('Parsing completed');
    return candidateArticle;
  }
}
