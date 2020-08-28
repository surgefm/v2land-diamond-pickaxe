import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  fromUrl,
  parseDomain,
  ParseResult,
  ParseResultType,
} from 'parse-domain';
import { FindOrCreateOptions, Op, WhereOptions } from 'sequelize';
import { FindOneSiteDto } from './dto/find-one-site.dto';
import { FindOrCreateSiteDto } from './dto/find-or-create-site.dto';
import { Site } from './site.model';

/**
 * Manages sites. Site should be completely unque.
 */
@Injectable()
export class SiteService {
  private readonly logger = new Logger(SiteService.name);
  constructor(@InjectModel(Site) private siteModel: typeof Site) {}
  /**
   * Create a site record. Will fail if it exists.
   * Will automatically fill-in the first domain or the Second Level Domain of subscription url as site name if no name is given
   * @param candidateSite known info of the site
   */
  async findOrCreate(
    candidateSite: FindOrCreateSiteDto
  ): Promise<[Site, Boolean]> {
    let parseResult: ParseResult;
    /**
     * Fill-in compulsary fields. Fallback order: name -> domains -> rssUrls
     */
    // Has domains, set the Second Level Domain of Site.domains[0] as default site name
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
        this.logger.error(
          `Invalid candidate site's domain ${candidateSite.domains[0]}`
        );
      }
    } else {
      // If the candidateSite has no known domain
      this.logger.debug('No domain is given');

      // Alternatively set Second Level Domain of Site.url as default site name
      if (candidateSite.rssUrls.length < 1) {
        this.logger.error('No rssUrls are given');
        return null;
      }
      parseResult = parseDomain(fromUrl(candidateSite.rssUrls[0]));
      if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        candidateSite.name =
          candidateSite.name || `${domain}.${topLevelDomains}`;

        // Fill-in the domain of the subscription url as a known domain
        candidateSite.domains = [`${domain}.${topLevelDomains}`];
      } else {
        this.logger.error(
          `Invalid candidate site rssurl's domain ${candidateSite.domains[0]}`
        );
      }
    }

    /**
     * Find query or create value if no site with overlapped domains
     */
    const options: FindOrCreateOptions = {
      where: {
        [Op.or]: {
          name: {
            [Op.eq]: candidateSite.name,
          },
          domains: {
            [Op.overlap]: candidateSite.domains,
          },
          rssUrls: {
            [Op.overlap]: candidateSite.rssUrls,
          },
        },
      },
      defaults: candidateSite,
    };
    return await this.siteModel.findCreateFind(options);
  }

  /**
   * Find sites with the given criteria. Since every site is unique, it will return an array of one site.
   * @param findOneSiteDto critera of the site to find
   */
  findAll(findOneSiteDto: FindOneSiteDto): Promise<Site[]> {
    return this.siteModel.findAll({ where: findOneSiteDto as WhereOptions });
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
  findOne(conditions: number | FindOneSiteDto) {
    if (typeof conditions === 'number') {
      return this.siteModel.findOne({ where: { id: conditions } });
    }

    return this.siteModel.findOne({ where: conditions as WhereOptions });
  }

  /**
   * Delete a site with the given id
   * @param id internal ID of the sit
   */
  async deleteOne(id: number): Promise<{ deleted: boolean; message?: string }> {
    try {
      const site = this.findOne(id);
      (await site).destroy();
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  /**
   * Returns all sites in database
   */
  async getAll(): Promise<Site[]> {
    return this.siteModel.findAll();
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
    return await this.siteModel.findOne({
      where: {
        domains: {
          [Op.contains]: [targetDomain],
        },
      },
    });
  }
}
