import { Site } from '../../site/site.model';
import { ArticleStatus } from './create-article.dto';

export class FindArticleDto {
  id?: number;
  url?: string;
  title?: string;
  content?: string;
  abstract?: string;
  source?: string;
  sourceUrl?: string;
  time?: Date;
  html?: string;
  screenshot?: string;
  status?: ArticleStatus;
  site?: Site;
  author?: string;
}
