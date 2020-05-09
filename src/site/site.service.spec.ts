import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { Site } from './site.entity';
import { SiteService } from './site.service';

const testCreateSiteDto = {
  name: 'Apple 更换和维修扩展计划',
  url: 'https://rsshub.app/apple/exchange_repair/zh-cn',
  shouldParseFulltext: true,
  dynamicLoading: false,
} as CreateSiteDto;
const testSiteId = 123;
const testSite1 = { id: testSiteId, ...testCreateSiteDto } as Site;
const testFindOneSiteDto: FindOneSiteDto = testCreateSiteDto;
const siteArray = [
  testSite1,
  {
    id: 1,
    name: 'Apple 更换和维修扩展计划',
    url: 'http://static.userland.com/gems/backend/rssTwoExample2.xml',
    shouldParseFulltext: true,
    dynamicLoading: false,
  },
  {
    id: 2,
    name: 'Apple 更换和维修扩展计划',
    url: 'http://static.userland.com/gems/backend/rssTwoExample2.xml',
    shouldParseFulltext: true,
    dynamicLoading: false,
  },
] as Site[];

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
            create: jest.fn().mockReturnValue(testSite1),
            save: jest.fn().mockReturnValue(testSite1),
            find: jest.fn().mockImplementation(
              (conditions?: FindOneSiteDto): Promise<Site[]> => {
                if (conditions == undefined) {
                  return Promise.resolve(siteArray);
                } else {
                  return Promise.resolve([siteArray[0]]);
                }
              }
            ),
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
      expect(repoSpy).toBeCalledWith({ id: 4 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return an array of sites', async () => {
      const sites = await service.getAll();
      expect(sites).toEqual(siteArray);
    });
  });
});
