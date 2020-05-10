import { Module } from '@nestjs/common';
import { DynamicPageArchivingModule } from '../dynamic-page-archiving/dynamic-page-archiving.module';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { SiteModule } from '../site/site.module';
import { EnqueueUrlController } from './enqueue-url.controller';
import { EnqueueUrlService } from './enqueue-url.service';

@Module({
  controllers: [EnqueueUrlController],
  providers: [EnqueueUrlService],
  imports: [FulltextExtractionModule, SiteModule, DynamicPageArchivingModule],
  exports: [EnqueueUrlService],
})
export class EnqueueUrlModule {}
