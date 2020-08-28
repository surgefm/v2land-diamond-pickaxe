import { IsFQDN, IsOptional, IsUrl } from 'class-validator';

export class FindOrCreateSiteDto {
  name?: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  rssUrls?: string[];

  @IsOptional()
  @IsFQDN({}, { each: true })
  domains?: string[];

  dynamicLoading?: boolean;

  shouldParseFulltext?: boolean;
}
