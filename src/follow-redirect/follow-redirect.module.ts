import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';
import { ArticleModule } from '../article/article.module';
import { FollowRedirectProcessor } from './follow-redirect.processor';
import { FollowRedirectService } from './follow-redirect.service';

@Module({
  imports: [
    HttpModule,
    ArticleModule,
    BullModule.registerQueueAsync({
      name: 'follow-redirect',
    }),
  ],
  providers: [FollowRedirectService, FollowRedirectProcessor],
  exports: [FollowRedirectService],
})
export class FollowRedirectModule {}
