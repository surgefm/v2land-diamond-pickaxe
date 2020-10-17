import { Module } from '@nestjs/common';
import { FulltextExtractionService } from './fulltext-extraction.service';

// TODO: Seperate dynamic page archiving and page parsing
@Module({
  providers: [FulltextExtractionService],
  exports: [FulltextExtractionService],
})
export class FulltextExtractionModule {}
