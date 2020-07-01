import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from './article.model';
import { ArticleService } from './article.service';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  exports: [ArticleService],
  providers: [ArticleService],
})
export class ArticleModule {}
