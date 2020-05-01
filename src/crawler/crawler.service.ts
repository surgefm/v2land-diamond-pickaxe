import { Injectable } from '@nestjs/common';
import { Url } from 'url';

@Injectable()
export abstract class CrawlerService {
    constructor(public name:string, public source: Url){}
  abstract async crawl();
}
