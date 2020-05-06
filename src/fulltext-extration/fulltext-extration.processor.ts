import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import * as Mercury from '@postlight/mercury-parser';
import { Job } from 'bull';
import * as puppeteer from 'puppeteer';
import { Article } from 'src/article/article.entity';

@Processor('fulltext-extration')
export class FulltextExtrationProcessor {
  private readonly logger = new Logger(FulltextExtrationProcessor.name);

  @Process('archive-dynamic-page')
  async archiveDynamicPage(job: Job): Promise<string> {
    this.logger.debug('Start archiving...');
    // TODO: pooling puppeteer instead of launching every time
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(job.data);
    const content = page.content();

    await browser.close();

    this.logger.debug('Archiving completed');
    return content;
  }
  @Process('parse')
  async parsePage(job: Job) {
    this.logger.debug('Start parsing page...');

    let article: Article = job.data;
    let parsed = await Mercury.parse(article.url, { html: article.html });
    article.title = parsed.title;
    article.content = parsed.content;
    article.author = parsed.author;
    article.time = new Date(parsed.date_published);
    article.abstract = parsed.excerpt;

    // TODO: Screenshot
    // TODO: Wayback machine

    this.logger.debug('Parsing completed');
    return article;
  }
}
