import { Module } from '@nestjs/common';
import { Site } from './site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteService } from './site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  exports: [TypeOrmModule],
  providers: [SiteService],
})
export class SiteModule {}
