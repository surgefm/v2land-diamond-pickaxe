import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { DynamicPageArchivingProcessor } from './dynamic-page-archiving.processor';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'dynamic-page-archiving',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [DynamicPageArchivingProcessor, DynamicPageArchivingService],
})
export class DynamicPageArchivingModule {}
