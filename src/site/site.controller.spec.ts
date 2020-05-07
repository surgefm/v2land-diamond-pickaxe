import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { SiteController } from './site.controller';
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

describe('Site Controller', () => {
  let service: SiteService;
  let repo: Repository<Site>;
  let controller: SiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteController],
      providers: [
        {
          provide: SiteService,

          // define all the methods that you use from the siteRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            create: jest
              .fn()
              .mockImplementation((testSite: CreateSiteDto) =>
                Promise.resolve({ id: 123, ...testSite })
              ),
          },
        },
        {
          provide: getRepositoryToken(Site),

          // define all the methods that you use from the siteRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            create: jest.fn().mockReturnValue(testSite1),
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
    controller = module.get<SiteController>(SiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should insert a site', async () => {
      expect(controller.createSite(testCreateSiteDto)).resolves.toEqual({
        id: 123,
        ...testCreateSiteDto,
      });
    });
  });
});
