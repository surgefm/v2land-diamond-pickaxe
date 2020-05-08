import { Injectable } from '@nestjs/common';
import { Url } from 'url';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { FulltextExtrationService } from '../fulltext-extration/fulltext-extration.service';

@Injectable()
export class EnqueueUrlService {
  constructor(private fulltextExtrationService: FulltextExtrationService) {}
  enqueue(url: Url) {
    let candidateArticle = new CreateArticleDto();
    candidateArticle.url = url.href;
    this.fulltextExtrationService.extractAndSave(candidateArticle);
  }
}
