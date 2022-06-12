import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { CreateArticleDto } from '../article/dto/create-article.dto';

@Injectable()
export class FollowRedirectService {
	private readonly logger = new Logger(FollowRedirectService.name);
	constructor(private httpService: HttpService) {}

	/**
	 * Follow 301/302 redirects, replace article url with redirected one, and initiates save.
	 * @param candidateArticle info about the target article
	 */
	async followRedirect(candidateArticle: CreateArticleDto) {
		const response = await this.httpService
			.get(candidateArticle.url)
			.toPromise();
		const redirectedUrl = response.request.res.responseUrl as string;
		candidateArticle.url = redirectedUrl;

		return candidateArticle;
	}
}
