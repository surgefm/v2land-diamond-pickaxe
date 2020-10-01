import { Module } from '@nestjs/common';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

@Module({
  imports: [FulltextExtractionModule],
  providers: [DynamicPageArchivingService],
  exports: [DynamicPageArchivingService],
})
export class DynamicPageArchivingModule {}
