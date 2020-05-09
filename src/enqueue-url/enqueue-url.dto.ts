import { IsUrl } from 'class-validator';
/**
 * Data transfer object sent from redstone to diamond hoe to crawl an article
 */
export class EnqueueUrlDto {
  @IsUrl()
  url: string;
}
