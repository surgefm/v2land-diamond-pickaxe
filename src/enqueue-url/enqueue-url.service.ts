import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateArticleDto } from '../article/dto/create-article.dto';

@Injectable()
export class EnqueueUrlService {
  private readonly logger = new Logger(EnqueueUrlService.name);
  constructor(@InjectQueue('enqueue-url') private enqueueUrlQueue: Queue) {}

  async enqueue(
    url: string,
    vanillaArticle: CreateArticleDto = new CreateArticleDto()
  ) {
    const candidateArticle = vanillaArticle;
    candidateArticle.url = url;
    await this.enqueueUrlQueue.add(candidateArticle);
  }
}
