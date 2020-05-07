// import { Injectable } from '@nestjs/common';
// import * as Parser from 'rss-parser';
// import { Output as Feed } from 'rss-parser';
// import { Connection } from 'typeorm';
// import { Url } from 'url';
// import { RSSCrawlerService } from '../rss-crawler/rss-crawler.service';

// @Injectable()
// export class RSSHubCrawlerService extends RSSCrawlerService {
//   constructor(public name: string, public source: Url, connection: Connection) {
//     super(name, source, connection);
//   }
//   async getFeed() {
//     const rssParser = new Parser();
//     const feed: Feed = await rssParser.parseUrl(this.source.href);

//     return feed;
//   }
// }
