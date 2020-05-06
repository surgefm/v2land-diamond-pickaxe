import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from 'src/article/article.module';
import { FulltextExtrationProcessor } from './fulltext-extration.processor';
import { FulltextExtrationService } from './fulltext-extration.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fulltext-extration',
    }),
    ArticleModule,
  ],
  providers: [FulltextExtrationProcessor, FulltextExtrationService],
  exports: [FulltextExtrationService],
})
export class FulltextExtrationModule {}
