import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import puppeteer from 'puppeteer';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';
/**
 * Handles jobs of queue `dynamic-page-archiving`.
 */
@Processor('dynamic-page-archiving')
export class DynamicPageArchivingProcessor {
  constructor(
    private readonly fulltextExtractionService: FulltextExtractionService
  ) {}
  private readonly logger = new Logger(DynamicPageArchivingProcessor.name);
  /**
   * Loads and snapshots a dynamic loading page. Never directly revoked.
   * @param job `job.data` contains url of the archive target
   */
  @Process()
  async archiveDynamicPage(
    job: Job<CreateArticleDto>
  ): Promise<CreateArticleDto> {
    this.logger.debug(`Start archiving ${job.data.url}...`);
    const candidateArticle = job.data;

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

  @OnQueueCompleted()
  async onCompleted(_: Job, candidateArticle: CreateArticleDto) {
    await this.fulltextExtractionService.extractAndSave(candidateArticle);
  }
}
