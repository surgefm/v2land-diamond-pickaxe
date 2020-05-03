import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { EnqueueUrlController } from './enqueue-url/enqueue-url.controller';
import { FulltextExtractModule } from './fulltext-extract/fulltext-extract.module';
import { SaveArticleModule } from './save-article/save-article.module';
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
  ],
  controllers: [AppController, EnqueueUrlController],
  providers: [AppService],
})
export class AppModule {}
