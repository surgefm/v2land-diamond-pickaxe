import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOrCreateSiteDto } from './dto/find-or-create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { SiteController } from './site.controller';
import { Site } from './site.model';
import { SiteService } from './site.service';

const testSiteName = 'Apple 更换和维修扩展计划';
const testSiteRSSUrl = 'https://rsshub.app/apple/exchange_repair/zh-cn';
const testSiteShouldExtractFulltext = true;
const testSiteDynamicLoading = false;
const testSiteId = 123;
const testCreateSiteDto = new FindOrCreateSiteDto();
testCreateSiteDto.name = testSiteName;
testCreateSiteDto.rssUrls = [testSiteRSSUrl];
testCreateSiteDto.dynamicLoading = testSiteDynamicLoading;
testCreateSiteDto.shouldParseFulltext = testSiteShouldExtractFulltext;
const testSite1 = new Site({
  name: testSiteName,
  rssUrls: testSiteRSSUrl,
  dynamicLoading: testSiteShouldExtractFulltext,
  shouldParseFulltext: testSiteDynamicLoading,
});
testSite1.id = testSiteId;
const testFindOneSiteDto: FindOneSiteDto = testCreateSiteDto;
const siteArray = [
  new Site({
    name: '联合国 安理会否决了决议',
    rssUrls: ['https://rsshub.app/un/scveto'],
    dynamicLoading: true,
    shouldParseFulltext: false,
  }),
  new Site({
    name: '单向空间 单读',
    rssUrls: ['https://rsshub.app/owspace/read/0'],
    dynamicLoading: true,
    shouldParseFulltext: false,
  }),
];
siteArray[0].id = 0;
siteArray[0].id = 1;

describe('Site Controller', () => {
  let service: SiteService;
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
              .mockImplementation((testSite: FindOrCreateSiteDto) =>
                Promise.resolve({ id: 123, ...testSite })
              ),
          },
        },
        {
          provide: getModelToken(Site),

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
