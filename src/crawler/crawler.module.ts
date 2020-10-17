import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnqueueUrlModule } from '../enqueue-url/enqueue-url.module';
import { SiteModule } from '../site/site.module';
import { CrawlerService } from './crawler.service';

@Module({
  providers: [CrawlerService],
  imports: [ConfigModule, SiteModule, EnqueueUrlModule],
})
export class CrawlerModule {}
