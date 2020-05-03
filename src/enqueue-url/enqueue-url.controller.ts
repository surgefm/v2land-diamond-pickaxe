import { Body, Controller, Post } from '@nestjs/common';
import { EnqueueUrlDto } from 'src/enqueue-url/enqueue-url-dto.interface';
import { EnqueueUrlService } from './enqueue-url';

@Controller('enqueue-url')
export class EnqueueUrlController {
  constructor(private enqueueUrlService: EnqueueUrlService) {}
  @Post()
  async enqueue(@Body() enqueueUrlDto: EnqueueUrlDto) {
    this.enqueueUrlService.enqueue(enqueueUrlDto.url);
  }
}
