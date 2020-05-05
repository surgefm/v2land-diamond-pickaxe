import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { Site } from './site.entity';
@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>
  ) {}
  async create(site: Site) {
    await this.siteRepository.save(site);
  }

  findAll(): Promise<Site[]> {
    return this.siteRepository.find();
  }

  findOne(id: string): Promise<Site>;
  findOne(conditions: FindOneSiteDto): Promise<Site>;
  findOne(conditions: any) {
    return this.siteRepository.findOne(conditions);
  }

  async remove(id: string): Promise<void> {
    await this.siteRepository.delete(id);
  }
}
