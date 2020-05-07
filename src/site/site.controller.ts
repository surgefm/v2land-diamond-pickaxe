import { Controller, Post } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SiteService } from './site.service';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  createSite(createSiteDto: CreateSiteDto) {
    this.siteService.create(createSiteDto);
  }
}
