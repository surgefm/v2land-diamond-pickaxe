import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Article } from '../article/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

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

    // Existing article found
    if (existingArticle.length == 0) {
      const article = new Article();
      article.url = createArticleDto.url;
      article.time = createArticleDto.time;
      article.title = createArticleDto.title;
      article.content = createArticleDto.content;
      article.html = createArticleDto.html;
      article.status = createArticleDto.status;
      article.screenshot = createArticleDto.screenshot;
      article.site = createArticleDto.site;

      return this.articleRepository.save(article);
      // Not found
    } else if (existingArticle.length > 0) {
      return existingArticle;
    } else {
      console.log('Error finding existing article');
    }
  }

  async findAll(conditions: Article): Promise<Article[]> {
    return await this.articleRepository.find(conditions);
  }

  async findOne(id: string): Promise<Article> {
    return await this.articleRepository.findOne(id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.articleRepository.delete(id);
  }
}
