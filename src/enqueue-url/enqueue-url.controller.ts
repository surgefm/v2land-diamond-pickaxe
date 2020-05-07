import { Body, Controller, Post } from '@nestjs/common';
import { EnqueueUrlService } from './enqueue-url';
import { EnqueueUrlDto } from './enqueue-url.dto';

@Controller('enqueue-url')
export class EnqueueUrlController {
  constructor(private enqueueUrlService: EnqueueUrlService) {}
  @Post()
  enqueue(@Body() enqueueUrlDto: EnqueueUrlDto) {
    this.enqueueUrlService.enqueue(enqueueUrlDto.url);
  }
}
