import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RSSCrawlerService} from './rss-crawler.service';
import {FulltextExtrationModule} from 'src/fulltext-extration/fulltext-extration.module';
import {AbstractGenerationModule} from 'src/abstract-generation/abstract-generation.module';

describe('RSSCrawlerService', () => {
  let service: RSSCrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RSSCrawlerService],
      imports: [FulltextExtrationModule, AbstractGenerationModule],
    }).compile();

    service = module.get<RSSCrawlerService>(RSSCrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    it('should have defined site', async () => {
        expect(service.site).resolves.toEqual(expected)
        expect(service.getFeed(testCreateSiteDto)).resolves.toEqual(testSite1);
        expect(repo.create).toBeCalledTimes(1);
        expect(repo.create).toBeCalledWith(testCreateSiteDto);
        expect(repo.save).toBeCalledTimes(1);
        expect(await service.create(testCreateSiteDto)).toBe(testSite1);
      });
    expect(service.site).toBeDefined();
  });

  describe('getFeed', () => {
    it('should insert a site', async () => {
      expect(service.getFeed(testCreateSiteDto)).resolves.toEqual(testSite1);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(testCreateSiteDto);
      expect(repo.save).toBeCalledTimes(1);
      expect(await service.create(testCreateSiteDto)).toBe(testSite1);
    });
  });
  describe('getFeed', () => {
    it('should insert a site', async () => {
      expect(service.getFeed(testCreateSiteDto)).resolves.toEqual(testSite1);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(testCreateSiteDto);
      expect(repo.save).toBeCalledTimes(1);
      expect(await service.create(testCreateSiteDto)).toBe(testSite1);
    });
  });

});
