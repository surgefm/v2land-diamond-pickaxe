import { Injectable } from '@nestjs/common';
import { Article } from 'src/article/article.entity';
import { SaveArticleService } from 'src/save-article/save-article.service';
import { Url } from 'url';

@Injectable()
export class EnqueueUrlService {
  constructor(private saveArticleService: SaveArticleService) {}
  enqueue(url: Url) {
    let article = new Article();
    article.url = url.href;
    this.saveArticleService.save(article);
  }
}
