import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { Article } from './article.model';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticleDto } from './dto/find-article.dto';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article
  ) {}
  /**
   * Create one if not present in the database and return the reference.
   * If there is already a record with the same url, it simply returns that record.
   * @param article An object that stores all info to create an article
   */
  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    let article = new Article(createArticleDto);
    article.save();
    return article;
  }
  /**
   * Find all articles that match the given conditions
   * @param conditions The criteria the returned value should match
   */
  async findAll(conditions: FindArticleDto): Promise<Article[]> {
    return await this.articleModel.findAll({
      where: conditions as WhereOptions,
    });
  }
  async findOne(id: number): Promise<Article>;
  async findOne(conditions: FindArticleDto): Promise<Article>;
  async findOne(conditions: number | FindArticleDto): Promise<Article> {
    if (typeof conditions == 'number') {
      return await this.articleModel.findOne({ where: { id: conditions } });
    }
    return await this.articleModel.findOne({
      where: conditions as WhereOptions,
    });
  }

  async deleteOne(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      const article = await this.findOne(id);
      article.destroy();
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async getAll(): Promise<Article[]> {
    return await this.articleModel.findAll();
  }
}
