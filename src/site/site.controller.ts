import { Body, Controller, Logger, Post } from '@nestjs/common';
import { SearchService } from '../search/search.service';
import { FindOrCreateSiteDto } from './dto/find-or-create-site.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly searchService: SearchService
  ) {}
  private readonly logger = new Logger(SiteController.name);

  /**
   * Create a site record
   * @param createSiteDto known info of the site
   */
  @Post()
  async createSite(@Body() createSiteDto: FindOrCreateSiteDto) {
    this.logger.debug(createSiteDto);
    const [site] = await this.siteService.findOrCreate(createSiteDto);
    await this.searchService.index(site, 'site');
    return site;
  }
}
