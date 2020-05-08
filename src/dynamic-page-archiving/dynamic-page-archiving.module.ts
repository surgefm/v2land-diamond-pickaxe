import { Module } from '@nestjs/common';
import { DynamicPageArchivingProcessor } from './dynamic-page-archiving.processor';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

@Module({
  providers: [DynamicPageArchivingProcessor, DynamicPageArchivingService],
})
export class DynamicPageArchivingModule {}
