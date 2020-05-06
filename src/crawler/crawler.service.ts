import { Injectable } from '@nestjs/common';
import { FindOneSiteDto } from 'src/site/dto/find-one-site.dto';
import { Site } from 'src/site/site.entity';
import { SiteService } from 'src/site/site.service';
import { Url } from 'url';

@Injectable()
export abstract class CrawlerService {
  sitePromise: Promise<Site>;
  constructor(
    public name: string,
    public source: Url,
    private readonly siteService: SiteService
  ) {
    const findOneSiteDto = new FindOneSiteDto();
    findOneSiteDto.name = this.name;
    this.sitePromise = this.siteService.findOne(findOneSiteDto);
  }
  abstract async crawl(): Promise<void>;
}
