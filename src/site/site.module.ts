import { Module } from '@nestjs/common';
import { Site } from './site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  exports: [TypeOrmModule],
  providers: [SiteService],
  controllers: [SiteController],
})
export class SiteModule {}
