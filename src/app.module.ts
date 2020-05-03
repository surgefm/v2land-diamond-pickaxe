import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { EnqueueUrlModule } from './enqueue-url/enqueue-url.module';
import { FulltextExtractModule } from './fulltext-extract/fulltext-extract.module';
import { SaveArticleModule } from './save-article/save-article.module';
import { SiteModule } from './site/site.module';
import { RSSCrawlerModule } from './rss-crawler/rss-crawler.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BullModule.registerQueueAsync({
      name: 'puppeteer-pool',
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    ArticleModule,
    SiteModule,
    FulltextExtractModule,
    SaveArticleModule,
    EnqueueUrlModule,
    RSSCrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
