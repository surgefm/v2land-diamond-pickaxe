import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { Site } from './site.entity';
/**
 * Manages sites. Site should be completely unque.
 */
@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>
  ) {}
  /**
   * Create a site record. Will fail if it exists
   * @param candidateSite known info of the site
   */
  async create(candidateSite: CreateSiteDto): Promise<Site> {
    const newSite = this.siteRepository.create(candidateSite);
    await this.siteRepository.save(newSite);
    return newSite;
  }

  /**
   * Find sites with the given criteria. Since every site is unique, it will return an array of one site.
   * @param findOneSiteDto critera of the site to find
   */
  findAll(findOneSiteDto: FindOneSiteDto): Promise<Site[]> {
    return this.siteRepository.find(findOneSiteDto);
  }

  /**
   * Find a site with the given id
   * @param id internal ID of the site
   */
  findOne(id: number): Promise<Site>;
  /**
   * Find a site with the given conditioin
   * @param conditions critera of the site to find
   */
  findOne(conditions: FindOneSiteDto): Promise<Site>;
  findOne(conditions: any) {
    return this.siteRepository.findOneOrFail(conditions);
  }

  /**
   * Delete a site with the given id
   * @param id internal ID of the sit
   */
  async deleteOne(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      await this.siteRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  /**
   * Returns all sites in database
   */
  async getAll(): Promise<Site[]> {
    return this.siteRepository.find();
  }
}
