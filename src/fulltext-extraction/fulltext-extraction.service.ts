import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateArticleDto } from '../article/dto/create-article.dto';

@Injectable()
export class FulltextExtractionService {
  constructor(
    @InjectQueue('fulltext-extraction') private fulltextExtractionQueue: Queue
  ) {}
  async extractAndSave(candidateArticle: CreateArticleDto) {
    // Parse Article & save
    await this.fulltextExtractionQueue.add(candidateArticle);
  }
}
