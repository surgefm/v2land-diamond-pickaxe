import { Url } from 'url';

export class CreateSiteDto {
  name: string;
  url: Url;
  dynamicLoading: boolean;
  parseFulltext:boolean;
}
