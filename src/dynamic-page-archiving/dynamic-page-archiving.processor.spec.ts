import { Test, TestingModule } from '@nestjs/testing';
import { DynamicPageArchivingProcessor } from './dynamic-page-archiving.processor';

describe('DynamicPageArchivingService', () => {
  let service: DynamicPageArchivingProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicPageArchivingProcessor],
    }).compile();

    service = module.get<DynamicPageArchivingProcessor>(
      DynamicPageArchivingProcessor
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
