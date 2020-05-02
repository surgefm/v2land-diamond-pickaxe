import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnqueueUrlController } from './enqueue-url/enqueue-url.controller';
import { ArticleModule } from './article/article.module';
import { SiteModule } from './site/site.module';
import { FulltextExtractModule } from './fulltext-extract/fulltext-extract.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ArticleModule,
    SiteModule,
    FulltextExtractModule,
  ],
  controllers: [AppController, EnqueueUrlController],
  providers: [AppService],
})
export class AppModule {}
