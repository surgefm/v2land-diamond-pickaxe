import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractGenerationModule } from './abstract-generation/abstract-generation.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CrawlerModule } from './crawler/crawler.module';
import { DynamicPageArchivingModule } from './dynamic-page-archiving/dynamic-page-archiving.module';
import { EnqueueUrlModule } from './enqueue-url/enqueue-url.module';
import { FulltextExtrationModule } from './fulltext-extration/fulltext-extration.module';
import { RSSCrawlerModule } from './rss-crawler/rss-crawler.module';
import { SiteModule } from './site/site.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: ['dist/**/*.entity{ .ts,.js}'],
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
    FulltextExtrationModule,
    EnqueueUrlModule,
    RSSCrawlerModule,
    AbstractGenerationModule,
    CrawlerModule,
    ScheduleModule.forRoot(),
    DynamicPageArchivingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
