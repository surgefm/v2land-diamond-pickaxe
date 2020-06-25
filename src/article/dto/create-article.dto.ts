import { IsUrl } from 'class-validator';
import { Site } from '../../site/site.model';

export class CreateArticleDto {
  @IsUrl()
  url: string;

  title?: string;

  content?: string;

  abstract?: string;

  @IsUrl()
  sourceUrl?: string;

  source?: string;

  time?: Date;

  html?: string;

  screenshot?: string;

  status: ArticleStatus;

  site: Site;

  author: string;
}
export enum ArticleStatus {
  Pending = 'pending',
}
