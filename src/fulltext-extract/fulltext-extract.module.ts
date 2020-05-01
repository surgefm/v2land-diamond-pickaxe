import { Module } from '@nestjs/common';
import { Article } from 'src/article/article.entity';
import * as Mercury from 'postlight__mercury-parser';

@Module({})
export class FulltextExtractModule {
  async extract(url: URL) {
    await this.mercuryExtract(url);
  }
  async mercuryExtract(url: URL) {
    const parsed = await Mercury.parse(url.href);
    const article = new Article();
    article.content = parsed.content;
    article.url=url.href;
  }
}
