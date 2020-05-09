import { Test, TestingModule } from '@nestjs/testing';
import { FulltextExtractionModule } from '../fulltext-extraction/fulltext-extraction.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

describe('EnqueueUrl Controller', () => {
  let controller: EnqueueUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnqueueUrlController],
      providers: [EnqueueUrlService],
      imports: [FulltextExtractionModule],
      exports: [EnqueueUrlService],
    }).compile();

    controller = module.get<EnqueueUrlController>(EnqueueUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
