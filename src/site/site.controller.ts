import { Controller, Post } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  async createSite(createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }
}
