import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
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
  @Column(DataType.TEXT)
  url: string;

  @AllowNull
  @Column(DataType.TEXT)
  title?: string;

  @AllowNull
  @Column(DataType.TEXT)
  content?: string;

  @AllowNull
  @Column(DataType.TEXT)
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
  @Column(DataType.TEXT)
  html?: string;

  @AllowNull
  @Column(DataType.TEXT)
  screenshot?: string;

  @Column({ defaultValue: Status.Pending })
  status: string;

  @AllowNull
  @Column(DataType.TEXT)
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
