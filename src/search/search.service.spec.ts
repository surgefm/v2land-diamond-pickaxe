import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { Site } from '../site/site.model';
import { CreateArticleDto } from '../article/dto/create-article.dto';
import { Article } from '../article/article.model';

const testSite = new Site({
	id: 1,
	name: 'Apple',
	rssUrls: [ 'https://rsshub.app/apple/exchange_repair/zh-cn' ],
	shouldParseFulltext: true,
	dynamicLoading: true,
	articles: []
});
const testCreateArticleDto = {
	name: 'Apple 更换和维修扩展计划',
	url: 'https://rsshub.app/apple/exchange_repair/zh-cn',
	status: 'pending',
	site: testSite,
	author: 'authorname'
} as CreateArticleDto;
const testArticleId = 123;
const testArticle1 = { id: testArticleId, ...testCreateArticleDto } as Article;

describe('SearchService', () => {
	let service: SearchService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ SearchService ]
		}).compile();

		service = module.get<SearchService>(SearchService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should index without throwing', () => {
		expect(service.index(testArticle1)).not.toThrow();
	});
});
