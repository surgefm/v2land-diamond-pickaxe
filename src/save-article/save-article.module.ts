import { Module } from '@nestjs/common';
import { SaveArticleProcessor } from './save-article.processor';
import { BullModule } from '@nestjs/bull';
import { ArticleModule } from 'src/article/article.module';
import { SaveArticleService } from './save-article.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'save-article',
    }),
    ArticleModule,
  ],
  providers: [SaveArticleProcessor, SaveArticleService],
})
export class SaveArticleModule {}
