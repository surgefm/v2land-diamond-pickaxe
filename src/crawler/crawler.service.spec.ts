// import { BullModule } from '@nestjs/bull';
// import { Test, TestingModule } from '@nestjs/testing';
// import { ArticleModule } from '../article/article.module';
// import { EnqueueUrlModule } from '../enqueue-url/enqueue-url.module';
// import { SiteModule } from '../site/site.module';
// import { CrawlerProcessor } from './rss-crawler.processor';
// import { CrawlerService } from './rss-crawler.service';

// describe('CrawlerService', () => {
//   let service: CrawlerService;

//   beforeEach(async () => {
//     const fakeProcessor = jest.fn();

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [CrawlerService, CrawlerProcessor],
//       imports: [
//         SiteModule,
//         EnqueueUrlModule,
//         ArticleModule,
//         BullModule.registerQueue({
//           name: 'crawler',
//           redis: {
//             host: '0.0.0.0',
//             port: 6379,
//           },
//           processors: [fakeProcessor],
//         }),
//       ],
//     }).compile();

//     service = module.get<CrawlerService>(CrawlerService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
