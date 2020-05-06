import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { FulltextExtrationService } from 'src/fulltext-extration/fulltext-extration.service';
import { Url } from 'url';

@Injectable()
export class EnqueueUrlService {
  constructor(private saveArticleService: FulltextExtrationService) {}
  enqueue(url: Url) {
    let candidateArticle = new CreateArticleDto();
    candidateArticle.url = url.href;
    this.saveArticleService.save(candidateArticle);
  }
}
