import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { FollowRedirectModule } from '../follow-redirect/follow-redirect.module';
import { FulltextExtractionProcessor } from './fulltext-extraction.processor';
import { FulltextExtractionService } from './fulltext-extraction.service';

// TODO: Seperate dynamic page archiving and page parsing
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'fulltext-extraction',
    }),
    ArticleModule,
    FollowRedirectModule,
  ],
  providers: [FulltextExtractionProcessor, FulltextExtractionService],
  exports: [FulltextExtractionService],
})
export class FulltextExtractionModule {}
