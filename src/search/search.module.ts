import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
	imports: [
		ElasticsearchModule.registerAsync({
			inject: [ ConfigService ],
			imports: [ ConfigModule ],
			useFactory: (configService: ConfigService) => ({
				node: configService.get<string>('ELASTICSEARCH_NODE'),
				auth: {
					username: configService.get<string>('ELASTICSEARCH_USERNAME'),
					password: configService.get<string>('ELASTICSEARCH_PASSWORD')
				}
			})
		})
	],
	providers: [ SearchService ],
	exports: [ SearchService ]
})
export class SearchModule {}
