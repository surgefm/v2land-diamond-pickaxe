import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';

@Injectable()
export class EnqueueUrlService {
  constructor(private fulltextExtractionService: FulltextExtractionService) {}
  enqueue(url: string) {
    let candidateArticle = new CreateArticleDto();
    candidateArticle.url = url;
    this.fulltextExtractionService.extractAndSave(candidateArticle);
  }
}
