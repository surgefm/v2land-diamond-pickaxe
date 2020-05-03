import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from 'src/article/article.module';
import { SaveArticleProcessor } from './save-article.processor';
import { SaveArticleService } from './save-article.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'save-article',
    }),
    ArticleModule,
  ],
  providers: [SaveArticleProcessor, SaveArticleService],
  exports: [SaveArticleService],
})
export class SaveArticleModule {}
