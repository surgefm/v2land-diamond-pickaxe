import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateArticleDto } from '../article/dto/create-article.dto';
/**
 * Job producer of snapshoting dynamic pages. Should revoke this in other modules.
 */
@Injectable()
export class DynamicPageArchivingService {
  constructor(
    @InjectQueue('dynamic-page-archiving')
    private dynamicPageArchivingQueue: Queue
  ) {}

  /**
   * Loads and snapshots a dynamic loading page.
   * Chained by fulltext extration and saving.
   * @param url url of the page to snapshot
   */
  async archiveParseSave(candidateArticle: CreateArticleDto): Promise<void> {
    // Archive dynamic page
    await this.dynamicPageArchivingQueue.add(candidateArticle);
  }
}
