import { Controller, Post } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { Site } from './site.entity';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  createSite(createSiteDto: CreateSiteDto) {
    const site = new Site();
    site.dynamicLoading = createSiteDto.dynamicLoading;
    site.name = createSiteDto.name;
    site.shouldParseFulltext = createSiteDto.parseFulltext;
    site.url = createSiteDto.url.href;
    this.siteService.create(site);
  }
}
