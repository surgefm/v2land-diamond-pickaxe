import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { DynamicPageArchivingModule } from '../dynamic-page-archiving/dynamic-page-archiving.module';
import { FulltextExtractionProcessor } from './fulltext-extraction.processor';
import { FulltextExtractionService } from './fulltext-extraction.service';

// TODO: Seperate dynamic page archiving and page parsing
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fulltext-extration',
    }),
    ArticleModule,
    DynamicPageArchivingModule,
  ],
  providers: [FulltextExtractionProcessor, FulltextExtractionService],
  exports: [FulltextExtractionService],
})
export class FulltextExtractionModule {}
