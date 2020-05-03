import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as puppeteer from 'puppeteer';
import * as Mercury from '@postlight/mercury-parser';
import { Article } from 'src/article/article.entity';

@Processor('save-article')
export class SaveArticleProcessor {
  private readonly logger = new Logger(SaveArticleProcessor.name);

  @Process('archive-dynamic-page')
  async archiveDynamicPage(job: Job) {
    this.logger.debug('Start archiving...');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(job.data);
    const content = await page.content;

    await browser.close();

    this.logger.debug('Archiving completed');
    return content;
  }
  @Process('parse')
  async parsePage(job: Job) {
    this.logger.debug('Start parsing page...');

    let article: Article = job.data;
    let parsed = Mercury.parse(article.url, { html: article.html });

    this.logger.debug('Parsing completed');
    return parsed;
  }
}
