import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteController } from './site.controller';
import { Site } from './site.entity';
import { SiteService } from './site.service';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  providers: [SiteService],
  controllers: [SiteController],
})
export class SiteModule {}
