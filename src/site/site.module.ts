import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteController } from './site.controller';
import { Site } from './site.entity';
import { SiteService } from './site.service';

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  exports: [TypeOrmModule],
  providers: [SiteService],
  controllers: [SiteController],
})
export class SiteModule {}
