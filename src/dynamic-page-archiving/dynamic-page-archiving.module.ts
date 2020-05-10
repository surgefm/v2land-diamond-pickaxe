import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { DynamicPageArchivingProcessor } from './dynamic-page-archiving.processor';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'dynamic-page-archiving',
    }),
    FulltextExtractionModule,
  ],
  providers: [DynamicPageArchivingProcessor, DynamicPageArchivingService],
  exports: [DynamicPageArchivingService],
})
export class DynamicPageArchivingModule {}
