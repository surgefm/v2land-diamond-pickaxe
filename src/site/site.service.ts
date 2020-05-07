import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { Site } from './site.entity';
@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>
  ) {}
  async create(candidateSite: CreateSiteDto): Promise<Site> {
    const newSite = this.siteRepository.create(candidateSite);
    await this.siteRepository.save(newSite);
    return newSite;
  }

  findAll(findOneSiteDto: FindOneSiteDto): Promise<Site[]> {
    return this.siteRepository.find(findOneSiteDto);
  }

  findOne(id: number): Promise<Site>;
  findOne(conditions: FindOneSiteDto): Promise<Site>;
  findOne(conditions: any) {
    return this.siteRepository.findOneOrFail(conditions);
  }

  async deleteOne(id: number): Promise<void> {
    await this.siteRepository.delete(id);
  }
}
