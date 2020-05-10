import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateArticleDto } from '../article/dto/create-article.dto';

@Injectable()
export class FollowRedirectService {
  private readonly logger = new Logger(FollowRedirectService.name);
  constructor(
    @InjectQueue('follow-redirect') private followRedirectQueue: Queue
  ) {}

  /**
   * Follow 301/302 redirects, replace article url with redirected one, and initiates save.
   * @param candidateArticle info about the target article
   */
  async followRedirectAndSave(candidateArticle: CreateArticleDto) {
    this.logger.debug(`Following ${candidateArticle.url}`);
    await this.followRedirectQueue.add(candidateArticle);
  }
}
