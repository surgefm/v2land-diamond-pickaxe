import { IsFQDN, IsUrl } from 'class-validator';

export class CreateSiteDto {
  name?: string;

  @IsUrl()
  url?: string;

  @IsFQDN({}, { each: true })
  domains?: string[];

  dynamicLoading?: boolean;

  shouldParseFulltext?: boolean;
}
