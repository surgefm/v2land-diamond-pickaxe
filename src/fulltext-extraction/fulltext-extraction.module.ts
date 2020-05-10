import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { FulltextExtractionProcessor } from './fulltext-extraction.processor';
import { FulltextExtractionService } from './fulltext-extraction.service';

// TODO: Seperate dynamic page archiving and page parsing
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fulltext-extraction',
    }),
    ArticleModule,
  ],
  providers: [FulltextExtractionProcessor, FulltextExtractionService],
  exports: [FulltextExtractionService],
})
export class FulltextExtractionModule {}
