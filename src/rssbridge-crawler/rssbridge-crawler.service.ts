import { RSSCrawlerService } from '../rss-crawler/rssCrawler.service';
import { Url } from 'url';
import { Injectable } from '@nestjs/common';
import Parser = require('rss-parser');
import { Output as Feed } from 'rss-parser';
import { Connection } from 'typeorm';

@Injectable()
export class RSSHubCrawlerService extends RSSCrawlerService {
  constructor(public name: string, public source: Url, connection: Connection) {
    super(name, source, connection);
  }
  async getFeed() {
    const rssParser = new Parser();
    const feed: Feed = await rssParser.parseURL(this.source.href);

    return feed;
  }
}


