import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleModule } from '../article/article.module';
import { FollowRedirectModule } from '../follow-redirect/follow-redirect.module';
import { FulltextExtractionProcessor } from './fulltext-extraction.processor';
import { FulltextExtractionService } from './fulltext-extraction.service';

export const fulltextExtractionQueue = BullModule.registerQueueAsync({
  name: 'fulltext-extraction',
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
  }),
});

// TODO: Seperate dynamic page archiving and page parsing
@Module({
  imports: [fulltextExtractionQueue, ArticleModule, FollowRedirectModule],
  providers: [FulltextExtractionProcessor, FulltextExtractionService],
  exports: [FulltextExtractionService, fulltextExtractionQueue],
})
export class FulltextExtractionModule {}
