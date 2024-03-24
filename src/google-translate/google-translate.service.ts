import { Injectable, InternalServerErrorException } from '@nestjs/common';
const { Translate } = require('@google-cloud/translate').v2;

@Injectable()
export class GoogleTranslateService {
  private translate: typeof Translate;

  constructor() {
    const credentials = JSON.parse(process.env.GOOGLE_TRANSLATE_CREDENTIALS);
    this.translate = new Translate({
      credentials,
      projectId: credentials.project_id,
    });
  }

  async translateExpression(
    expression: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<string> {
    try {
      const [translation] = await this.translate.translate(expression, {
        from: sourceLanguage,
        to: targetLanguage,
      });

      if (!translation) {
        throw new InternalServerErrorException('Translation failed.');
      }

      return translation;
    } catch (error) {
      console.error('Error while translating:', error);
      throw new InternalServerErrorException('Translation failed.');
    }
  }
}
