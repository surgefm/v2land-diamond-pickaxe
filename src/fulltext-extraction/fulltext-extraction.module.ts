import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { FollowRedirectModule } from '../follow-redirect/follow-redirect.module';
import { FulltextExtractionService } from './fulltext-extraction.service';

// TODO: Seperate dynamic page archiving and page parsing
@Module({
  imports: [ArticleModule, FollowRedirectModule],
  providers: [FulltextExtractionService],
  exports: [FulltextExtractionService],
})
export class FulltextExtractionModule {}
