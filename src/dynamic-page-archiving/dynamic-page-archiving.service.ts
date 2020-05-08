import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { Url } from 'url';

@Injectable()
export class DynamicPageArchivingService {
  constructor(
    @InjectQueue('dynamic-page-archiving')
    private dynamicPageArchivingQueue: Queue
  ) {}

  async archive(url: Url): Promise<string> {
    // Archive dynamic page
    let job = (await this.dynamicPageArchivingQueue.add(url)) as Job<string>;
    return job.returnvalue as string;
  }
}
