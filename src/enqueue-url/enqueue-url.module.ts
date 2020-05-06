import { Module } from '@nestjs/common';
import { FulltextExtrationModule } from 'src/fulltext-extration/fulltext-extration.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

@Module({
  controllers: [EnqueueUrlController],
  providers: [EnqueueUrlService],
  imports: [FulltextExtrationModule],
})
export class EnqueueUrlModule {}
