import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { AppService } from '../app.service';
import { Article } from '../article/article.model';
import { Site } from '../site/site.model';

@Injectable()
export class SearchService {
	private readonly logger = new Logger(AppService.name);

	constructor(private readonly elasticsearchService: ElasticsearchService) {}

	async index(article: Article): Promise<Record<string, any>>;
	async index(site: Site): Promise<Record<string, any>>;
	async index(doc: Article | Site): Promise<Record<string, any>> {
		const response = await this.elasticsearchService.index({
			index: this.clazzNameToIndex(typeof doc),
			body: doc.toJSON()
		});
		if (response.statusCode && response.statusCode >= 400) {
			this.logger.warn(`Elasticsearch: ${response.warnings}`);
		}
		return response.body;
	}

	clazzNameToIndex(name: string): string {
		return name.toLowerCase();
	}
}
