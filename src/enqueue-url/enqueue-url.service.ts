import { Injectable, Logger } from '@nestjs/common';
import { fromUrl, parseDomain, ParseResultType } from 'parse-domain';
import { DynamicPageArchivingService } from 'src/dynamic-page-archiving/dynamic-page-archiving.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';
import { SiteService } from '../site/site.service';

@Injectable()
export class EnqueueUrlService {
  private readonly logger = new Logger(EnqueueUrlService.name);
  constructor(
    private fulltextExtractionService: FulltextExtractionService,
    private dynamicPageArchivingService: DynamicPageArchivingService,
    private siteService: SiteService
  ) {}
  async enqueue(url: string) {
    let candidateArticle = new CreateArticleDto();
    candidateArticle.url = url;

    this.logger.debug(`Article enqueued: ${url}`);

    // Identify which site it belongs to
    let site = await this.siteService.getSiteOf(url);

    // If no corresponding site, create one
    if (site === undefined) {
      let parseResult = parseDomain(fromUrl(url));
      if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        site = await this.siteService.create({
          domains: [`${domain}.${topLevelDomains}`],
        });
      } else {
        // TODO: error handling
      }
    }
    if (site !== undefined) {
      candidateArticle.site = site;

      if (candidateArticle.site.dynamicLoading) {
        // The source doesn't provide fulltext: archive -> parse -> save
        this.dynamicPageArchivingService.archiveParseSave(candidateArticle);
      } else {
        // The source provides fulltext: parse -> save
        await this.fulltextExtractionService.extractAndSave(candidateArticle);
      }
    } else {
      throw new Error(`URL ${url} is malformed or unsupported`);
    }
  }
}
