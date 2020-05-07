import { IsUrl } from 'class-validator';
import { Url } from 'url';
/**
 * Data transfer object sent from redstone to diamond hoe to crawl an article
 */
export class EnqueueUrlDto {
  @IsUrl()
  url: Url;
}
