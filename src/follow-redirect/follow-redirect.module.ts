import { HttpModule, Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { SearchModule } from '../search/search.module';
import { FollowRedirectService } from './follow-redirect.service';

@Module({
  imports: [HttpModule, ArticleModule, , SearchModule],
  providers: [FollowRedirectService],
  exports: [FollowRedirectService],
})
export class FollowRedirectModule {}
