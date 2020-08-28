import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { DynamicPageArchivingService } from '../dynamic-page-archiving/dynamic-page-archiving.service';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';
import { FindOrCreateSiteDto } from '../site/dto/find-or-create-site.dto';
import { SiteService } from '../site/site.service';

@Injectable()
export class EnqueueUrlService {
  private readonly logger = new Logger(EnqueueUrlService.name);
  constructor(
    private fulltextExtractionService: FulltextExtractionService,
    private dynamicPageArchivingService: DynamicPageArchivingService,
    private siteService: SiteService
  ) {}

  async enqueue(
    url: string,
    vanillaArticle: CreateArticleDto = new CreateArticleDto()
  ) {
    let candidateArticle = vanillaArticle;
    candidateArticle.url = url;

    this.logger.debug(`Article enqueued: ${url}`);

    // Identify which site it belongs to
    const findSiteDto = new FindOrCreateSiteDto();
    findSiteDto.rssUrls = [url];
    const [site] = await this.siteService.findOrCreate(findSiteDto);
    candidateArticle.site = site;

    if (candidateArticle.site.dynamicLoading) {
      // The source doesn't provide fulltext: archive -> parse -> save
      await this.dynamicPageArchivingService.archiveParseSave(candidateArticle);
    } else {
      // The source provides fulltext: parse -> save
      await this.fulltextExtractionService.extractAndSave(candidateArticle);
    }
  }
}
