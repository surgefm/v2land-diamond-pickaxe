import { Injectable } from '@nestjs/common';
import { FindOneSiteDto } from 'src/site/dto/find-one-site.dto';
import { Site } from 'src/site/site.entity';
import { SiteService } from 'src/site/site.service';
import { Url } from 'url';

@Injectable()
export abstract class CrawlerService {
  constructor(public name:string, public source: Url) {}
  abstract async crawl();
}
