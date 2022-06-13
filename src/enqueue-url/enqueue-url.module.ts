import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleModule } from '../article/article.module';
import { DynamicPageArchivingModule } from '../dynamic-page-archiving/dynamic-page-archiving.module';
import { FollowRedirectModule } from '../follow-redirect/follow-redirect.module';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { SearchModule } from '../search/search.module';
import { SiteModule } from '../site/site.module';
import { EnqueueUrlController } from './enqueue-url.controller';
import { EnqueueUrlProcessor } from './enqueue-url.processor';
import { EnqueueUrlService } from './enqueue-url.service';

export const enqueueUrlQueue = BullModule.registerQueueAsync({
	name: 'enqueue-url',
	inject: [ConfigService],
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		redis: {
			host: configService.get<string>('REDIS_HOST'),
			port: configService.get<number>('REDIS_PORT'),
			username: configService.get<string>('REDIS_USERNAME'),
			password: configService.get<string>('REDIS_PASSWORD'),
		},
	}),
});

@Module({
	controllers: [EnqueueUrlController],
	providers: [EnqueueUrlService, EnqueueUrlProcessor],
	imports: [
		FulltextExtractionModule,
		SiteModule,
		DynamicPageArchivingModule,
		FollowRedirectModule,
		ArticleModule,
		SearchModule,
		enqueueUrlQueue,
	],
	exports: [EnqueueUrlService],
})
export class EnqueueUrlModule {}
