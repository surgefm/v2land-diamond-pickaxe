import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { CrawlerModule } from './crawler/crawler.module';
import { DynamicPageArchivingModule } from './dynamic-page-archiving/dynamic-page-archiving.module';
import {
	EnqueueUrlModule,
	enqueueUrlQueue,
} from './enqueue-url/enqueue-url.module';
import { FollowRedirectModule } from './follow-redirect/follow-redirect.module';
import { FulltextExtractionModule } from './fulltext-extraction/fulltext-extraction.module';
import { SearchModule } from './search/search.module';
import { SiteModule } from './site/site.module';
import { HealthModule } from './health/health.module';
@Module({
	imports: [
		SequelizeModule.forRootAsync({
			inject: [ConfigService],
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				dialect: 'postgres',
				host: configService.get<string>('DB_HOST'),
				port: configService.get<number>('DB_PORT'),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_DATABASE'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: configService.get<boolean>('DB_SYNC'),
				keepConnectionAlive: true,
				autoLoadModels: true,
				ssl: true,
			}),
		}),
		enqueueUrlQueue,
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
				// The interval between crawling batches
				CRAWLER_INTERVAL: Joi.number().default(360000),
				NODE_ENV: Joi.string()
					.valid('development', 'production', 'test', 'provision')
					.default('development'),
				// Port number of the API endpoints exposing
				PORT: Joi.number().default(3000),
				REDIS_PORT: Joi.number().default(6379),
				REDIS_HOST: Joi.string().default('127.0.0.1'),
				DB_PORT: Joi.number().default(5432),
				DB_HOST: Joi.string().default("127.0.0.1"),
				DB_DATABASE: Joi.string().default('v2land'),
				DB_USERNAME: Joi.string().default('postgres'),
				DB_PASSWORD: Joi.string().default('password'),
				DB_SYNC: Joi.bool().default(false),
				ELASTICSEARCH_NODE: Joi.string()
					.uri()
					.default('http://elasticsearch:9200'),
				ELASTICSEARCH_USERNAME: Joi.string().default(''),
				ELASTICSEARCH_PASSWORD: Joi.string().default(''),
			}),
		}),
		FollowRedirectModule,
		SearchModule,
		HealthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
