import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticleModule } from '../article/article.module';
import { FollowRedirectProcessor } from './follow-redirect.processor';
import { FollowRedirectService } from './follow-redirect.service';

export const followRedirectQueue = BullModule.registerQueueAsync({
  name: 'follow-redirect',
  inject: [ConfigService],
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    redis: {
      host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT'),
    },
  }),
});

@Module({
  imports: [HttpModule, ArticleModule, followRedirectQueue],
  providers: [FollowRedirectService, FollowRedirectProcessor],
  exports: [FollowRedirectService, followRedirectQueue],
})
export class FollowRedirectModule {}
