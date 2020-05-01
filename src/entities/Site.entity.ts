import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Article } from './Article.entity';

/**
 * This is the site entity used across langchao.org
 */
@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  domains: string[];

  @OneToMany(type => Article,article=>article.siteId)
  articles: Article[];
}
