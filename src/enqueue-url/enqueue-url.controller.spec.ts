import { Test, TestingModule } from '@nestjs/testing';
import { EnqueueUrlController } from './enqueue-url.controller';

describe('EnqueueUrl Controller', () => {
  let controller: EnqueueUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnqueueUrlController],
    }).compile();

    controller = module.get<EnqueueUrlController>(EnqueueUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
