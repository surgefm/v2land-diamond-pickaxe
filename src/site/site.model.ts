import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Article } from '../article/article.model';

/**
 * This is the news source site entity used across langchao.org
 * Each Site bounds to a specific rule describing the necessary pre-processing before a new article of that site is added
 */
@Table
export class Site extends Model<Site> {
  /**
   * URLs to RSS endpoint of the site.
   * Should be unique, but it is not the primary key.
   */
  @Column(DataType.ARRAY(DataType.TEXT))
  rssUrls: string[];

  @Column
  name: string;

  /**
   * Domain site uses.
   */
  @Column(DataType.ARRAY(DataType.TEXT))
  domains?: string[];

  /**
   * Whether articles in this site should go through fulltext extraction module
   */
  @Column({ defaultValue: true })
  shouldParseFulltext: boolean;

  /**
   * Whether articles are dynamically loaded.
   * If so, they should be passed through puppeteer to get loaded HTML before enter fulltext extraction module
   */
  @Column({ defaultValue: false })
  dynamicLoading: boolean;

  @HasMany(() => Article)
  articles: Article[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // TODO: @VersionColumn

  // constructor(
  //   name?: string,
  //   url?: string[],
  //   shouldParseFulltext?: boolean,
  //   dynamicLoading?: boolean
  // ) {
  //   super();
  //   this.rssUrls = url || [];
  //   this.name = name || '';
  //   this.shouldParseFulltext = shouldParseFulltext || false;
  //   this.dynamicLoading = dynamicLoading || false;
  // }
}
