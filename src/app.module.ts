import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CrawlerModule } from './crawler/crawler.module';
import { DynamicPageArchivingModule } from './dynamic-page-archiving/dynamic-page-archiving.module';
import { EnqueueUrlModule } from './enqueue-url/enqueue-url.module';
import { FulltextExtractionModule } from './fulltext-extraction/fulltext-extraction.module';
import { SiteModule } from './site/site.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'test',
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    BullModule.registerQueue({
      name: 'crawler',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'fulltext-extraction',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'dynamic-page-archiving',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ArticleModule,
    SiteModule,
    FulltextExtractionModule,
    EnqueueUrlModule,
    CrawlerModule,
    ScheduleModule.forRoot(),
    DynamicPageArchivingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
