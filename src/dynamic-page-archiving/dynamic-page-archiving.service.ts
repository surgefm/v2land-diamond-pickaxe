import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import puppeteer from 'puppeteer';
import { CreateArticleDto } from '../article/dto/create-article.dto';

/**
 * Job producer of snapshoting dynamic pages. Should revoke this in other modules.
 */
@Injectable()
export class DynamicPageArchivingService {
  private readonly logger = new Logger(DynamicPageArchivingService.name);
  constructor(
    @InjectQueue('dynamic-page-archiving')
    private dynamicPageArchivingQueue: Queue
  ) {}

  /**
   * Loads and snapshots a dynamic loading page.
   * Chained by fulltext extration and saving.
   * @param candidateArticle article object of the page to snapshot
   */
  async archiveDynamicPage(
    candidateArticle: CreateArticleDto
  ): Promise<CreateArticleDto> {
    this.logger.debug(`Start archiving ${candidateArticle.url}...`);

    // TODO: pooling puppeteer instead of launching every time
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(candidateArticle.url, { waitUntil: 'networkidle2' });
    candidateArticle.html = await page.content(); // Should be HTML because we haven't parse yet
    this.logger.debug(`candidateArticle.content: ${candidateArticle.content}`);

    await browser.close();

    this.logger.debug('Archiving completed');
    return candidateArticle;
  }
}
