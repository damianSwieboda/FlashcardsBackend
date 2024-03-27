import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  GENERATE_PROMPT_USAGE_EXAMPLE,
  GENERATE_PROMPT_USAGE_EXAMPLE_TRANSLATION,
} from './promptFactory/cardTextGenerationPrompts';

@Injectable()
export class OpenAiService {
  private openai: any;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  private async openAIApiCall(prompt: string) {
    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content;
  }

  async generateUsageExample(sourceExpression: string) {
    const prompt = GENERATE_PROMPT_USAGE_EXAMPLE(sourceExpression);
    const usageExample = this.openAIApiCall(prompt);

    return usageExample;
  }

  async generateUsageExampleTranslation(
    sourceExpression: string,
    sourceUsageExample: string,
    targetLanguageExpression: string,
    targetLanguageFullName: string
  ) {
    const prompt = GENERATE_PROMPT_USAGE_EXAMPLE_TRANSLATION(
      sourceExpression,
      sourceUsageExample,
      targetLanguageExpression,
      targetLanguageFullName
    );

    const translatedUsageExample = this.openAIApiCall(prompt);

    return translatedUsageExample;
  }
}
