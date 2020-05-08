import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bull';
import { mock } from 'jest-mock-extended';
import { DynamicPageArchivingProcessor } from './dynamic-page-archiving.processor';

const testUrl =
  'https://theinitium.com/article/20200507-notes-wsj-goodbye-zuckerberg/';
const expectedParagraph =
  '一位直接了解鮑爾斯言論的人士說，鮑爾斯離開後，私下批評Facebook領導層未能採納他在其專業領域即政治方面提出的建議。鮑爾斯不予置評。黑斯廷斯的發言人未回應置評請求。';

describe('DynamicPageArchivingService', () => {
  let processor: DynamicPageArchivingProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicPageArchivingProcessor],
    }).compile();

    processor = module.get<DynamicPageArchivingProcessor>(
      DynamicPageArchivingProcessor
    );
  });

  it('should be defined', () => {
    expect(processor).toBeDefined();
  });

  describe('archiveDynamicPage', () => {
    it('should archive the page including the body of the text that loads dynamically', async () => {
      const job: Job<string> = mock<Job<string>>();
      job.data = testUrl;
      expect(processor.archiveDynamicPage(job)).resolves.toInclude(
        expectedParagraph
      );
    });
  });
});
