import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from '../article/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticleDto } from './dto/find-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}
  /**
   * Create one if not present in the database and return the reference.
   * If there is already a record with the same url, it simply returns that record.
   * @param article An object that stores all info to create an article
   */
  async create(createArticleDto: CreateArticleDto) {
    const existingArticle = await this.articleRepository.find(createArticleDto);

    if (existingArticle.length == 0) {
      // Existing article not found
      const newArticle = this.articleRepository.create(createArticleDto);
      await this.articleRepository.save(newArticle);
      return newArticle;
    } else if (existingArticle.length > 0) {
      // Found
      return existingArticle;
    } else {
      console.log('Error finding existing article');
    }
  }

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

  async remove(id: number): Promise<DeleteResult> {
    return await this.articleRepository.delete(id);
  }
}
