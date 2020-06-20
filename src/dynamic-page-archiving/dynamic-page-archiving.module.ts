import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { DynamicPageArchivingProcessor } from './dynamic-page-archiving.processor';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

export const dynamicPageArchivingQueue = BullModule.registerQueueAsync({
  name: 'dynamic-page-archiving',
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
  }),
});
@Module({
  imports: [dynamicPageArchivingQueue, FulltextExtractionModule],
  providers: [DynamicPageArchivingProcessor, DynamicPageArchivingService],
  exports: [DynamicPageArchivingService, dynamicPageArchivingQueue],
})
export class DynamicPageArchivingModule {}
