import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { FindOneSiteDto } from './dto/find-one-site.dto';
@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>
  ) {}

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
