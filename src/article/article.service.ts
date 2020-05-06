import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/article/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

  async create(article: Article) {
    // const article = new Article();
    // article.url = createArticleDto.url;
    // article.time = createArticleDto.time;
    // article.title = createArticleDto.title;
    // article.content = createArticleDto.content;
    // article.html = createArticleDto.html;
    // article.status = createArticleDto.status;
    // article.screenshot = createArticleDto.screenshot;
      // article.site = createArticleDto.site;

    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  findOne(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
