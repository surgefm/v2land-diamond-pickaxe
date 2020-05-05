import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from '../article/article.entity';

/**
 * This is the news source site entity used across langchao.org
 */
@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * URL to RSS endpoint of the site.
   * Should be unique, but it is not the primary key.
   */
  @Column()
  url: string;

  @Column()
  name: string;

  /**
   * Domain site uses. Deprecated.
   */
  @Column()
  domains: string[];

  /**
   * Whether articles in this site should go through fulltext extraction module
   */
  @Column()
  shouldParseFulltext: boolean;

  /**
   * Whether articles are dynamically loaded.
   * If so, they should be passed through puppeteer to get loaded HTML before enter fulltext extraction module
   */
  @Column()
  dynamicLoading: boolean;

  @OneToMany(
    () => Article,
    article => article.siteId,
    { cascade: true }
  )
  articles: Article[];
}
