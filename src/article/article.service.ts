import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../article/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticleDto } from './dto/find-article.dto';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}
  /**
   * Create one if not present in the database and return the reference.
   * If there is already a record with the same url, it simply returns that record.
   * @param article An object that stores all info to create an article
   */
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const existingArticle = await this.articleRepository.find(createArticleDto);

    if (existingArticle.length == 0) {
      // Existing article not found
      const newArticle = this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(newArticle);
      return newArticle;
    } else if (existingArticle.length > 0) {
      // Found
      return existingArticle[0];
    } else {
      this.logger.error('Error finding existing article');
    }
  }
  /**
   * Find all articles that match the given conditions
   * @param conditions The criteria the returned value should match
   */
  async findAll(conditions: FindArticleDto): Promise<Article[]> {
    return await this.articleRepository.find(conditions);
  }
  async findOne(id: number): Promise<Article>;
  async findOne(conditions: FindArticleDto): Promise<Article>;
  async findOne(conditions: number | FindArticleDto): Promise<Article> {
    if (typeof conditions == 'number') {
      return await this.articleRepository.findOneOrFail(conditions);
    }
    return await this.articleRepository.findOneOrFail(conditions);
  }

  async deleteOne(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.articleRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async getAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }
}
