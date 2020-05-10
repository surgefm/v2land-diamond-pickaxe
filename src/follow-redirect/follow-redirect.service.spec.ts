import { Test, TestingModule } from '@nestjs/testing';
import { FollowRedirectService } from './follow-redirect.service';

describe('FollowRedirectService', () => {
  let service: FollowRedirectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowRedirectService],
    }).compile();

    service = module.get<FollowRedirectService>(FollowRedirectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
