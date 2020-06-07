import Joi from '@hapi/joi';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CrawlerModule } from './crawler/crawler.module';
import { DynamicPageArchivingModule } from './dynamic-page-archiving/dynamic-page-archiving.module';
import { EnqueueUrlModule } from './enqueue-url/enqueue-url.module';
import { FollowRedirectModule } from './follow-redirect/follow-redirect.module';
import { FulltextExtractionModule } from './fulltext-extraction/fulltext-extraction.module';
import { SiteModule } from './site/site.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        keepConnectionAlive: true,
        autoLoadEntities: true,
      }),
    }),
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'crawler',
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'fulltext-extraction',
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'dynamic-page-archiving',
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
    BullModule.registerQueueAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: 'follow-redirect',
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
    ArticleModule,
    SiteModule,
    FulltextExtractionModule,
    EnqueueUrlModule,
    CrawlerModule,
    ScheduleModule.forRoot(),
    DynamicPageArchivingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        CRAWLER_INTERVAL: Joi.number().default(360000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        REDIS_PORT: Joi.number().default(6379),
        REDIS_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_HOST: Joi.string().default('localhost'),
        DB_DATABASE: Joi.string().default('v2land'),
        DB_USERNAME: Joi.string()
          .default('postgres'),
        DB_PASSWORD: Joi.string().default('password'),
      }),
    }),
    FollowRedirectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
