import { Test, TestingModule } from '@nestjs/testing';
import { FulltextExtrationModule } from '../fulltext-extration/fulltext-extration.module';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlController } from './enqueue-url.controller';

describe('EnqueueUrl Controller', () => {
  let controller: EnqueueUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnqueueUrlController],
      providers: [EnqueueUrlService],
      imports: [FulltextExtrationModule],
      exports: [EnqueueUrlService],
    }).compile();

    controller = module.get<EnqueueUrlController>(EnqueueUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
