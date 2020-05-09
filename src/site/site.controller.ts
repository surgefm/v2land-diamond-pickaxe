import { Controller, Post } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  /**
   * Create a site record
   * @param createSiteDto known info of the site
   */
  @Post()
  async createSite(createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }
}
