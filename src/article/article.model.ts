import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Site } from '../site/site.model';

enum Status {
  Pending = 'pending',
  Admitted = 'admitted',
  Rejected = 'rejected',
  Removed = 'removed',
}

/**
 * This is the article entity used across langchao.org
 */
@Table({ tableName: 'news' })
export class Article extends Model<Article> {
  @Column
  url: string;

  @AllowNull
  @Column
  title?: string;

  @AllowNull
  @Column
  content?: string;

  @AllowNull
  @Column
  abstract?: string;

  @AllowNull
  @Column
  source?: string;

  @Column
  sourceUrl?: string;

  @AllowNull
  @Column
  time?: Date;

  @AllowNull
  @Column
  html?: string;

  @AllowNull
  @Column
  screenshot?: string;

  @Column({ defaultValue: Status.Pending })
  status: string;

  @AllowNull
  @Column
  comment?: string;

  @AllowNull
  @Column
  author?: string;

  @BelongsTo(() => Site)
  site: Site;

  @ForeignKey(() => Site)
  @Column
  siteId: number;
}
