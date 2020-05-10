import { Body, Controller, Post } from '@nestjs/common';
import { EnqueueUrlDto } from './enqueue-url.dto';
import { EnqueueUrlService } from './enqueue-url.service';

@Controller('enqueue-url')
export class EnqueueUrlController {
  constructor(private enqueueUrlService: EnqueueUrlService) {}

  /**
   * Add a new article by url to the database.
   * @param enqueueUrlDto url of the article
   */
  @Post()
  async enqueue(@Body() enqueueUrlDto: EnqueueUrlDto) {
    console.log('enqueueUrlDto.url' + enqueueUrlDto.url);

    // TODO: No check to ensure the uniqueness of articles yet
    await this.enqueueUrlService.enqueue(enqueueUrlDto.url);
  }
}
