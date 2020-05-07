import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { Site } from './site.entity';
import { SiteService } from './site.service';

const testSiteName = 'Apple 更换和维修扩展计划';
const testSiteUrl = 'https://rsshub.app/apple/exchange_repair/zh-cn';
const testSiteShouldExtractFulltext = true;
const testSiteDynamicLoading = false;
const testSiteId = 123;
const testCreateSiteDto = new CreateSiteDto();
testCreateSiteDto.name = testSiteName;
testCreateSiteDto.url = testSiteUrl;
testCreateSiteDto.dynamicLoading = testSiteDynamicLoading;
testCreateSiteDto.shouldParseFulltext = testSiteShouldExtractFulltext;
const testSite1 = new Site(
  testSiteName,
  testSiteUrl,
  testSiteShouldExtractFulltext,
  testSiteDynamicLoading
);
testSite1.id = testSiteId;
const testFindOneSiteDto: FindOneSiteDto = testCreateSiteDto;
const siteArray = [
  new Site(
    '联合国 安理会否决了决议',
    'https://rsshub.app/un/scveto',
    true,
    false
  ),
  new Site('单向空间 单读', 'https://rsshub.app/owspace/read/0', true, false),
];
siteArray[0].id = 0;
siteArray[0].id = 1;

describe('SiteService', () => {
  let service: SiteService;
  let repo: Repository<Site>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SiteService,
        {
          provide: getRepositoryToken(Site),

          // define all the methods that you use from the siteRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            save: jest.fn().mockReturnValue(testSite1),
            find: jest.fn().mockResolvedValue(siteArray),
            findOneOrFail: jest.fn().mockResolvedValue(testSite1),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<SiteService>(SiteService);
    repo = module.get<Repository<Site>>(getRepositoryToken(Site));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create
  describe('create', () => {
    it('should insert a site', async () => {
      expect(service.create(testCreateSiteDto)).resolves.toEqual(testSite1);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith(testCreateSiteDto);
      expect(repo.save).toBeCalledTimes(1);
      expect(await service.create(testCreateSiteDto)).toBe(testSite1);
    });
  });

  // findAll
  describe('findAll', () => {
    it('should get an array of a single site', () => {
      const repoSpy = jest.spyOn(repo, 'find');
      expect(service.findAll(testFindOneSiteDto)).resolves.toEqual([testSite1]);
      expect(repoSpy).toBeCalledWith(testFindOneSiteDto);
    });
  });

  // findOne
  describe('findOne by id', () => {
    it('should get a single site', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(testSiteId)).resolves.toEqual(testSite1);
      expect(repoSpy).toBeCalledWith(testSiteId);
    });
  });
  describe('findOne by DTO', () => {
    it('should get a single site', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(testFindOneSiteDto)).resolves.toEqual(testSite1);
      expect(repoSpy).toBeCalledWith(testFindOneSiteDto);
    });
  });

  // delete
  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.deleteOne(0)).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.deleteOne(4)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith(4);
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
