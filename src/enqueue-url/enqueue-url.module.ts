import { Module } from '@nestjs/common';
import { SaveArticleModule } from 'src/save-article/save-article.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

@Module({
  controllers: [EnqueueUrlController],
  providers: [EnqueueUrlService],
  imports: [SaveArticleModule],
})
export class EnqueueUrlModule {}
