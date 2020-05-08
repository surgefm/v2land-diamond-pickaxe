import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as puppeteer from 'puppeteer';

@Processor('dynamic-page-archiving')
export class DynamicPageArchivingProcessor {
  private readonly logger = new Logger(DynamicPageArchivingProcessor.name);
  @Process()
  async archiveDynamicPage(job: Job<string>): Promise<string> {
    this.logger.debug('Start archiving...');
    const url = job.data;

    // TODO: pooling puppeteer instead of launching every time
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const content = await page.content();
    console.log(content);

    await browser.close();

    this.logger.debug('Archiving completed');
    return content;
  }
}
