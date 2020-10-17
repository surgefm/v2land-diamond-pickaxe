import { Module } from '@nestjs/common';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

@Module({
  providers: [DynamicPageArchivingService],
  exports: [DynamicPageArchivingService],
})
export class DynamicPageArchivingModule {}
