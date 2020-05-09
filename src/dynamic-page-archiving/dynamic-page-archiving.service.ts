import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Url } from 'url';
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
   * @param url url of the page to snapshot
   */
  async archive(url: Url): Promise<string> {
    // Archive dynamic page
    let job = (await this.dynamicPageArchivingQueue.add(url)) as Job<string>;
    return job.returnvalue as string;
  }
}
