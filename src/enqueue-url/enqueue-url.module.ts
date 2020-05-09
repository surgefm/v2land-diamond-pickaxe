import { Module } from '@nestjs/common';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

@Module({
  controllers: [EnqueueUrlController],
  providers: [EnqueueUrlService],
  imports: [FulltextExtractionModule],
  exports: [EnqueueUrlService],
})
export class EnqueueUrlModule {}
