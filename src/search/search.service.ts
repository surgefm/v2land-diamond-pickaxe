import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { AppService } from '../app.service';
import { Article } from '../article/article.model';

@Injectable()
export class SearchService {
	private readonly logger = new Logger(AppService.name);

	constructor(private readonly elasticsearchService: ElasticsearchService) {}
	async index(article: Article) {
		const response = await this.elasticsearchService.index({
			index: 'article',
			body: article.toJSON()
		});
		if (response.statusCode && response.statusCode >= 400) {
			this.logger.warn(`Elasticsearch: ${response.warnings}`);
		}
		return response.body;
	}
}
