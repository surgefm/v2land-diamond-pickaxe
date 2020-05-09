import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { EnqueueUrlModule } from '../enqueue-url/enqueue-url.module';
import { SiteModule } from '../site/site.module';
import { CrawlerProcessor } from './crawler.processor';
import { CrawlerService } from './crawler.service';

@Module({
  providers: [CrawlerService, CrawlerProcessor],
  imports: [
    SiteModule,
    EnqueueUrlModule,
    ArticleModule,
    BullModule.registerQueue({
      name: 'crawler',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
})
export class CrawlerModule {}
