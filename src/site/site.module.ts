import { Module } from '@nestjs/common';
import { Site } from './site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  exports: [TypeOrmModule],
})
export class SiteModule {}
