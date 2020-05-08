import { Test, TestingModule } from '@nestjs/testing';
import { DynamicPageArchivingService } from './dynamic-page-archiving.service';

describe('DynamicPageArchivingService', () => {
  let service: DynamicPageArchivingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicPageArchivingService],
    }).compile();

    service = module.get<DynamicPageArchivingService>(
      DynamicPageArchivingService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
