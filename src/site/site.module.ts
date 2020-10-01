import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SearchModule } from '../search/search.module';
import { SiteController } from './site.controller';
import { Site } from './site.model';
import { SiteService } from './site.service';

@Module({
  imports: [SequelizeModule.forFeature([Site]), SearchModule],
  providers: [SiteService],
  controllers: [SiteController],
  exports: [SiteService],
})
export class SiteModule {}
