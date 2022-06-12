import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlgoliaModule } from '@surgefm/nestjs-algolia';
import { SearchService } from './search.service';

@Module({
	imports: [
		AlgoliaModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				appId: configService.get<string>('ALGOLIA_APPLICATION_ID'),
				apiKey: configService.get<string>('ALGOLIA_API_KEY'),
				options: null,
			}),
			inject: [ConfigService],
		}),
	],
	providers: [SearchService],
	exports: [SearchService],
})
export class SearchModule {}
