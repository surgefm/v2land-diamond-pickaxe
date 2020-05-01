import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { Article } from "src/article/article.entity";

@Injectable()
export class ArticleService {
  constructor(private connection: Connection) {}

async create(article:Article) {
    const queryRunner = this.connection.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(article);  
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}