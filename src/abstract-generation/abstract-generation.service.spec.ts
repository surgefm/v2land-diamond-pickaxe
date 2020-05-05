import { Test, TestingModule } from '@nestjs/testing';
import { AbstractGenerationService } from './abstract-generation.service';

describe('AbstractGenerationService', () => {
  let service: AbstractGenerationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbstractGenerationService],
    }).compile();

    service = module.get<AbstractGenerationService>(AbstractGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
