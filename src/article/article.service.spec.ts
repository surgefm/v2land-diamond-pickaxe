import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FindArticleDto } from './dto/find-article.dto';

const testCreateArticleDto = {
  name: 'Apple 更换和维修扩展计划',
  url: 'https://rsshub.app/apple/exchange_repair/zh-cn',
  status: 'pending',
  site: {
    id: 1,
    name: 'Apple',
    rssUrls: ['https://rsshub.app/apple/exchange_repair/zh-cn'],
    shouldParseFulltext: true,
    dynamicLoading: true,
    articles: [],
  },
  author: 'authorname',
} as CreateArticleDto;
const testArticleId = 123;
const testArticle1 = { id: testArticleId, ...testCreateArticleDto } as Article;
const testFindArticleDto: FindArticleDto = testCreateArticleDto;
const articleArray = [
  testArticle1,
  {
    id: 1,
    name: 'Apple 更换和维修扩展计划',
    url: 'https://rsshub.app/apple/exchange_repair/zh-cn',
    status: 'pending',
    site: {
      id: 1,
      name: 'Apple',
      rssUrls: ['https://rsshub.app/apple/exchange_repair/zh-cn'],
      shouldParseFulltext: true,
      dynamicLoading: true,
      articles: [],
    },
    author: 'authorname',
  },
  {
    id: 2,
    name: 'Apple 更换和维修扩展计划',
    url: 'https://rsshub.app/apple/exchange_repair/zh-cn',
    status: 'pending',
    site: {
      id: 1,
      name: 'Apple',
      rssUrls: ['https://rsshub.app/apple/exchange_repair/zh-cn'],
      shouldParseFulltext: true,
      dynamicLoading: true,
      articles: [],
    },
    author: 'authorname',
  },
] as Article[];

describe('ArticleService', () => {
  let service: ArticleService;
  let repo: Repository<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(Article),

          // define all the methods that you use from the siteRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            create: jest.fn().mockReturnValue(testArticle1),
            save: jest.fn().mockReturnValue(testArticle1),
            find: jest
              .fn()
              .mockImplementation((conditions?: FindArticleDto): Article[] => {
                if (conditions == undefined) {
                  return articleArray;
                } else {
                  return [articleArray[0]];
                }
              }),
            findOneOrFail: jest.fn().mockResolvedValue(testArticle1),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    repo = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create
  describe('create', () => {
    it('should insert a site', async () => {
      expect(service.create(testCreateArticleDto)).resolves.toEqual(
        testArticle1
      );
      expect(repo.find).toBeCalledTimes(1);
    });
  });

  // findAll
  describe('findAll', () => {
    it('should get an array of a single article', () => {
      const repoSpy = jest.spyOn(repo, 'find');
      expect(service.findAll(testFindArticleDto)).resolves.toEqual([
        testArticle1,
      ]);
      expect(repoSpy).toBeCalledWith(testFindArticleDto);
    });
  });

  // findOne
  describe('findOne by id', () => {
    it('should get a single article', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(testArticleId)).resolves.toEqual(testArticle1);
      expect(repoSpy).toBeCalledWith(testArticleId);
    });
  });
  describe('findOne by DTO', () => {
    it('should get a single article', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(testFindArticleDto)).resolves.toEqual(
        testArticle1
      );
      expect(repoSpy).toBeCalledWith(testFindArticleDto);
    });
  });

  // delete
  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.deleteOne(1)).resolves.toEqual({ deleted: true });
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
    it('should return an array of articles', async () => {
      const articles = await service.getAll();
      expect(articles).toEqual(articleArray);
    });
  });
});
