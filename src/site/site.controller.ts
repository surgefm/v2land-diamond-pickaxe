import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}
  private readonly logger = new Logger(SiteController.name);

  /**
   * Create a site record
   * @param createSiteDto known info of the site
   */
  @Post()
  async createSite(@Body() createSiteDto: CreateSiteDto) {
    this.logger.debug(createSiteDto);
    return this.siteService.create(createSiteDto);
  }
}
