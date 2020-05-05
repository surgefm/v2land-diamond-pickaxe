import { Injectable } from '@nestjs/common';
import * as htmlToText from 'html-to-text';
@Injectable()
export class AbstractGenerationService {
  generateAbstract(contentHTML: string) {
    const text = htmlToText.fromString(contentHTML, {
      wordwrap: null,
    }) as string;
    const abstract = text.substr(0, 200);
    return abstract;
  }
}
