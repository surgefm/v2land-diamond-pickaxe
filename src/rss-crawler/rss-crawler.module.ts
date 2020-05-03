import { Module } from '@nestjs/common';
import { SaveArticleModule } from 'src/save-article/save-article.module';
import { RSSCrawlerService } from './rss-crawler.service';

@Module({
  providers: [RSSCrawlerService],
  imports: [SaveArticleModule],
})
export class RSSCrawlerModule {}
