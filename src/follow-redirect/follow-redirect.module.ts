import { HttpModule, Module } from '@nestjs/common';
import { FollowRedirectService } from './follow-redirect.service';

@Module({
  imports: [HttpModule],
  providers: [FollowRedirectService],
  exports: [FollowRedirectService],
})
export class FollowRedirectModule {}
