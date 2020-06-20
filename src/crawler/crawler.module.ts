import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleModule } from '../article/article.module';
import { EnqueueUrlModule } from '../enqueue-url/enqueue-url.module';
import { SiteModule } from '../site/site.module';
import { CrawlerProcessor } from './crawler.processor';
import { CrawlerService } from './crawler.service';

export const crawlerQueue = BullModule.registerQueueAsync({
  name: 'crawler',
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
  providers: [CrawlerService, CrawlerProcessor],
  imports: [
    ConfigModule,
    SiteModule,
    EnqueueUrlModule,
    ArticleModule,
    crawlerQueue,
  ],
  exports: [crawlerQueue],
})
export class CrawlerModule {}
