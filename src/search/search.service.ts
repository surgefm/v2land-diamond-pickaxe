import {Result} from '@elastic/elasticsearch/lib/api/types';
import { Injectable, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { AppService } from '../app.service';
import { Article } from '../article/article.model';
import { Site } from '../site/site.model';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async index(
    article: Article,
    indexName: string
  ): Promise<void>;
  async index(site: Site, indexName: string): Promise<void>;
  async index(
    doc: Article | Site,
    indexName: string
  ): Promise<void> {
    const body = doc.toJSON();
    this.logger.debug(doc.toJSON());

    const response = await this.elasticsearchService.index({
      index: indexName,
      body,
    });
    if (!['created', "updated"].includes(response.result) ) {
      this.logger.warn(`Elasticsearch: ${response.result}`);
    }
  }

  clazzNameToIndex(name: string): string {
    return name.toLowerCase();
  }
}
