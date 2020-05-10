import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: true })
  abstract?: string;

  @Column({ nullable: true })
  source?: string;

  @Column({ nullable: true })
  sourceUrl?: string;

  @Column({ nullable: true })
  time?: Date;

  @Column({ nullable: true })
  html?: string;

  @Column({ nullable: true })
  screenshot?: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ nullable: true })
  author?: string;

  @ManyToOne(
    () => Site,
    site => site.articles
  )
  site: Site; // will automatically suffix `Id` in database
}
