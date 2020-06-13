import { IsFQDN, IsOptional, IsUrl } from 'class-validator';

export class CreateSiteDto {
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
