import { Injectable } from '@nestjs/common';
import { TranslateExpressionDTO } from './dto';
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

  async translateExpression(translateExpressionInput: TranslateExpressionDTO): Promise<string> {
    const { expressionToTranslate, sourceLanguage, targetLanguage } = translateExpressionInput;
    try {
      const [translation] = await this.translate.translate(expressionToTranslate, {
        from: sourceLanguage,
        to: targetLanguage,
      });

      return translation;
    } catch (error) {
      console.error('Error while translating:', error);
      throw error;
    }
  }
}
