import { Body, Controller, Post } from '@nestjs/common';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlDto } from './enqueue-url.dto';

@Controller('enqueue-url')
export class EnqueueUrlController {
  constructor(private enqueueUrlService: EnqueueUrlService) {}

  /**
   * Add a new article by url to the database.
   * @param enqueueUrlDto url of the article
   */
  @Post()
  enqueue(@Body() enqueueUrlDto: EnqueueUrlDto) {
    // TODO: No check to ensure the uniqueness of articles yet
    this.enqueueUrlService.enqueue(enqueueUrlDto.url);
  }
}
