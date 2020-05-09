import { Injectable } from '@nestjs/common';
import { Url } from 'url';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';

@Injectable()
export class EnqueueUrlService {
  constructor(private fulltextExtractionService: FulltextExtractionService) {}
  enqueue(url: Url) {
    let candidateArticle = new CreateArticleDto();
    candidateArticle.url = url.href;
    this.fulltextExtractionService.extractAndSave(candidateArticle);
  }
}
