import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FollowRedirectService } from './follow-redirect.service';

@Module({
	imports: [HttpModule],
	providers: [FollowRedirectService],
	exports: [FollowRedirectService],
})
export class FollowRedirectModule {}
