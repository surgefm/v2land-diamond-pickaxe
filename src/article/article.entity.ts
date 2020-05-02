import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Site } from '../site/site.entity';

/**
 * This is the article entity used across langchao.org
 */
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title?: string;

  @Column()
  content?: string;

  @Column()
  abstract?: string;

  @Column()
  source?: string;

  @Column()
  sourceUrl?: string;

  @Column()
  time?: Date;

  @Column()
  html?: string;

  @Column()
  screenshot?: string;

  @Column({ default: 'pending' })
  status: string;

  @OneToMany(
    () => Site,
    siteId => siteId.articles
  )
  siteId: Site;
}
