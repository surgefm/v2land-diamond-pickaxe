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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fullArticleRoutes = [
  // BBC
  '/bbc/world-asia',
  '/bbc/world',
  '/bbc/business',
  '/bbc/politics',
  '/bbc/education',
  '/bbc/science_and_environment',
  '/bbc/technology',
  '/bbc/chinese',
  '/bbc/traditionalchinese',
  // FT中文
  '/ft/chinese/news',
  // Solidot
  '/solidot/www',
  // 雅虎
  '/yahoo-news/hk',
  '/yahoo-news/tw',
  // 香港电台
  '/rthk-news/hk/local',
  '/rthk-news/hk/greaterchina',
  '/rthk-news/hk/international',
  '/rthk-news/hk/finance',
  '/rthk-news/hk/sport',
  // 卫报
  '/guardian/china',
  // 纽约时报
  '/nytimes/dual',
  // 南方周末
  '/infzm/2',
  // 每日经济
  '/nbd/daily',
  // 联合早报
  '/zaobao/realtime/china',
  '/zaobao/realtime/singapore',
  '/zaobao/realtime/world',
  '/zaobao/realtime/zfinance',
  '/zaobao/znews/china',
  '/zaobao/znews/singapore',
  '/zaobao/znews/sea',
  '/zaobao/znews/world',
  '/zaobao/znews/sports',
  '/zaobao/znews/fukan',
  // 澎湃
  '/thepaper/channel/25950',
  '/thepaper/channel/25951',
  // Sixtone(澎湃旗下)
  '/sixthtone/news',
  // Verge
  '/verge',
  // 多维
  '/dwnews/yaowen/global',
  '/dwnews/rank',
  // 经济观察网
  '/eeo/151',
  '/eeo/152',
  '/eeo/153',
  '/eeo/154',
  // 东方
  '/eastday/sh',
  // 第一财经
  '/yicai/brief',
  // 新京报
  '/bjnews/realtime',
  // 21世纪财经
  '/21caijing/channel/Property',
  '/21caijing/channel/finance',

  // 朝日中文
  '/asahichinese-j/society',
  '/asahichinese-j/politics_economy',
  '/asahichinese-j/world',
];

const summmaryRoutes = [
  // hk01
  '/hk01/channel/409',
  '/hk01/channel/19',
  '/hk01/channel/396',
  '/hk01/channel/422',
  '/hk01/channel/2',
  '/hk01/channel/364',
  '/hk01/channel/367',
  '/hk01/channel/428',
  '/hk01/channel/409',
  '/hk01/zone/1',
];
