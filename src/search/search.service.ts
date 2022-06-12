import { SaveObjectResponse } from '@algolia/client-search';
import { Injectable, Logger } from '@nestjs/common';
import { InjectAlgoliaClient } from '@surgefm/nestjs-algolia';
import { SearchClient } from 'algoliasearch';
import { AppService } from '../app.service';
import { Article } from '../article/article.model';
import { Site } from '../site/site.model';

@Injectable()
export class SearchService {
	private readonly logger = new Logger(AppService.name);

	constructor(
		@InjectAlgoliaClient() private readonly algoliaClient: SearchClient
	) {}

	async index(article: Article, indexName: string): Promise<SaveObjectResponse>;
	async index(site: Site, indexName: string): Promise<SaveObjectResponse>;
	async index(
		doc: Article | Site,
		indexName: string
	): Promise<SaveObjectResponse> {
		const body = doc.toJSON();
		this.logger.debug(doc.toJSON());

		const index = this.algoliaClient.initIndex(indexName);
		return index.saveObject(body);
	}

	clazzNameToIndex(name: string): string {
		return name.toLowerCase();
	}
}
