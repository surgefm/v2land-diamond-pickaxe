import { Injectable } from '@nestjs/common';
import { FulltextExtrationService } from 'src/fulltext-extration/fulltext-extration.service';
import { Url } from 'url';

@Injectable()
export class EnqueueUrlService {
  constructor(private saveArticleService: FulltextExtrationService) {}
  enqueue(url: Url) {
    let article = new Article();
    article.url = url.href;
    this.saveArticleService.save(article);
  }
}
