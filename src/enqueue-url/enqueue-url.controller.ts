import { Controller, Req, Post, Body } from '@nestjs/common';
import { EnqueueUrlDto } from 'src/enqueue-url/enqueue-url-dto.interface';

@Controller('enqueue-url')
export class EnqueueUrlController {
    @Post()
    async enqueue(@Body() enqueueUrlDto: EnqueueUrlDto){
        
        
    }
}
