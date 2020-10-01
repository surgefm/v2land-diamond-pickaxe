import { Injectable, Logger } from '@nestjs/common';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { DynamicPageArchivingService } from '../dynamic-page-archiving/dynamic-page-archiving.service';
import { FollowRedirectService } from '../follow-redirect/follow-redirect.service';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';
import { SearchService } from '../search/search.service';
import { FindOrCreateSiteDto } from '../site/dto/find-or-create-site.dto';
import { SiteService } from '../site/site.service';

@Injectable()
export class EnqueueUrlService {
  private readonly logger = new Logger(EnqueueUrlService.name);
  constructor(
    private fulltextExtractionService: FulltextExtractionService,
    private dynamicPageArchivingService: DynamicPageArchivingService,
    private followRedirectService: FollowRedirectService,
    private siteService: SiteService,
    private articleService: ArticleService,
    private searchService: SearchService
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

    candidateArticle = await this.dynamicPageArchivingService.archiveDynamicPage(
      candidateArticle
    );
    candidateArticle = await this.fulltextExtractionService.parsePage(
      candidateArticle
    );
    candidateArticle = await this.followRedirectService.followRedirect(
      candidateArticle
    );

    const article = await this.articleService.create(candidateArticle);
    await this.searchService.index(article, 'news');
  }
}
