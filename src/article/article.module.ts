import { Module } from '@nestjs/common';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule, ArticleService],
  providers: [ArticleService],
})
export class ArticleModule {}
