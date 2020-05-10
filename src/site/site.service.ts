import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  fromUrl,
  parseDomain,
  ParseResult,
  ParseResultType,
} from 'parse-domain';
import { Repository } from 'typeorm';
import { CreateSiteDto } from './dto/create-site.dto';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { Site } from './site.entity';

/**
 * Manages sites. Site should be completely unque.
 */
@Injectable()
export class SiteService {
  private readonly logger = new Logger(SiteService.name);
  constructor(
    @InjectRepository(Site) private siteRepository: Repository<Site>
  ) {}
  /**
   * Create a site record. Will fail if it exists.
   * Will automatically fill-in the first domain or the Second Level Domain of subscription url as site name if no name is given
   * @param candidateSite known info of the site
   */
  async create(candidateSite: CreateSiteDto): Promise<Site> {
    let parseResult: ParseResult;
    // Set Second Level Domain of Site.domains[0] as default site name
    if (
      candidateSite.domains !== null &&
      candidateSite.domains !== undefined &&
      candidateSite.domains.length > 0
    ) {
      parseResult = parseDomain(candidateSite.domains[0]);
      if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        candidateSite.name =
          candidateSite.name || `${domain}.${topLevelDomains}`;
      } else {
        // TODO: error handling
      }
    } else {
      this.logger.debug('!!!!!!!!!!!No domain is given!!!!!!!!!!');

      // If the candidateSite has no known domain
      // Alternatively set Second Level Domain of Site.url as default site name
      parseResult = parseDomain(fromUrl(candidateSite.url));
      if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        candidateSite.name =
          candidateSite.name || `${domain}.${topLevelDomains}`;

        // Fill-in the domain of the subscription url as a known domain
        candidateSite.domains = [`${domain}.${topLevelDomains}`];
      } else {
        // TODO: error handling
      }
    }

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

  async getSiteOf(url: string): Promise<Site> {
    let targetDomain: string;

    let parseResult = parseDomain(fromUrl(url));
    if (parseResult.type === ParseResultType.Listed) {
      const { subDomains, domain, topLevelDomains } = parseResult;
      targetDomain = `${domain}.${topLevelDomains}`;
    } else {
      // TODO: error handling
    }
    return await this.siteRepository
      .createQueryBuilder('site')
      .where(':targetDomain = ANY (site.domains)', {
        targetDomain: targetDomain,
      })
      .getOne();
  }
}
