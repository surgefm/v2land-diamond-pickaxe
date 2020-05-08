import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as Puppeteer from 'puppeteer';

@Processor('dynamic-page-archiving')
export class DynamicPageArchivingProcessor {
  private readonly logger = new Logger(DynamicPageArchivingProcessor.name);
  @Process()
  async archiveDynamicPage(job: Job): Promise<string> {
    this.logger.debug('Start archiving...');
    // TODO: pooling puppeteer instead of launching every time
    const browser = await Puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(job.data);
    const content = page.content();

    await browser.close();

    this.logger.debug('Archiving completed');
    return content;
  }
}
