import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { ArticleService } from '../article/article.service';
import { CreateArticleDto } from '../article/dto/create-article.dto';
@Processor('follow-redirect')
export class FollowRedirectProcessor {
  private readonly logger = new Logger(FollowRedirectProcessor.name);
  constructor(
    private httpService: HttpService,
    private readonly articleService: ArticleService
  ) {}

  @Process()
  async followRedirect(job: Job<CreateArticleDto>) {
    let candidateArticle = job.data;

    const response = await this.httpService
      .get(candidateArticle.url)
      .toPromise();
    const redirectedUrl = response.request.res.responseUrl as string;
    candidateArticle.url = redirectedUrl;

    return candidateArticle;
  }

  @OnQueueCompleted()
  async onCompleted(_: number, parsedArticle: CreateArticleDto) {
    this.articleService.create(parsedArticle);
  }
}
