import { Site } from '../../site/site.entity';

export class CreateArticleDto {
  url: string;
  title?: string;
  content?: string;
  abstract?: string;
  source?: string;
  sourceUrl?: string;
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
