import { IsUrl } from 'class-validator';

export class CreateSiteDto {
  name: string;

  @IsUrl()
  url: string;

  dynamicLoading: boolean;

  shouldParseFulltext: boolean;
}
