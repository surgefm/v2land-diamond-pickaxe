import { Module } from '@nestjs/common';
import * as Mercury from 'postlight__mercury-parser';
import { CreateArticleDto } from 'src/article/dto/create-article.dto';
import { Url } from 'url';

@Module({})
export class FulltextExtractModule {
  async extract(url: Url) {
    await this.mercuryExtract(url);
  }
  async mercuryExtract(url: Url) {
    const parsed = await Mercury.parse(url.href);
    const article = new CreateArticleDto();
    article.url = parsed.url;
    article.content = parsed.content;
    article.title = parsed.title;
    article.time = new Date(parsed.date_published);
  }
}
