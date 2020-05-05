import { Module } from '@nestjs/common';
import { AbstractGenerationService } from './abstract-generation.service';

@Module({
  providers: [AbstractGenerationService]
  exports:[AbstractGenerationService]
})
export class AbstractGenerationModule {}
