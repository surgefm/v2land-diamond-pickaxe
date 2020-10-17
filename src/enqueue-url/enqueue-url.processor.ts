import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { DynamicPageArchivingService } from '../dynamic-page-archiving/dynamic-page-archiving.service';
import { FollowRedirectService } from '../follow-redirect/follow-redirect.service';
import { FulltextExtractionService } from '../fulltext-extraction/fulltext-extraction.service';
import { SearchService } from '../search/search.service';
import { FindOrCreateSiteDto } from '../site/dto/find-or-create-site.dto';
import { SiteService } from '../site/site.service';

@Processor('enqueue-url')
export class EnqueueUrlProcessor {
  private readonly logger = new Logger(EnqueueUrlProcessor.name);

  constructor(
    private fulltextExtractionService: FulltextExtractionService,
    private dynamicPageArchivingService: DynamicPageArchivingService,
    private followRedirectService: FollowRedirectService,
    private siteService: SiteService,
    private articleService: ArticleService,
    private searchService: SearchService
  ) {}

  @Process()
  async enqueue(job: Job<CreateArticleDto>) {
    let candidateArticle = job.data as CreateArticleDto;

    this.logger.debug(`Article enqueued: ${candidateArticle.url}`);

    // Identify which site it belongs to
    const findSiteDto = new FindOrCreateSiteDto();
    findSiteDto.rssUrls = [candidateArticle.url];
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
