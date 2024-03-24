import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  GENERATE_PROMPT_GENERATE_USAGE_EXAMPLE,
  GENERATE_PROMPT_GENERATE_USAGE_EXAMPLE_TRANSLATION,
} from './promptFactory/cardTextPrompts';

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
    const prompt = GENERATE_PROMPT_GENERATE_USAGE_EXAMPLE(sourceExpression);
    const usageExample = this.openAIApiCall(prompt);

    return usageExample;
  }

  async generateUsageExampleTranslation(
    sourceExpression: string,
    sourceUsageExample: string,
    translatedExpression: string
  ) {
    const prompt = GENERATE_PROMPT_GENERATE_USAGE_EXAMPLE_TRANSLATION(
      sourceExpression,
      sourceUsageExample,
      translatedExpression
    );

    const translatedUsageExample = this.openAIApiCall(prompt);

    return translatedUsageExample;
  }
}

//  TODO: Need to add validation pipe for all translation and ai api calls, and need to create property "status" in Card with possible values: "OK", and, someting like "warnning".
// Every returned value that is possibly correct will be checked by AI, and will return status "OK",
// if AI in validation pipe consider it as good, and if someting wrong, if translation or usage example is warnning, it will return status: "warnning",
// and then user will be informed that someting is wrong, and then he can accept it or handle it by himself, in card edditor. Only Cards with status "OK", will be possible to learn.
// Creating status for card is to recognize possible errors in card texts that were created by AI
// status "warnning" should be set if:
// 1. AI indicated some problematic translation,
// 2. card is not finished, like user provided expression, but not provide translation of it
// What if user edit card with status "OK" generated with AI?
// should I use "card created by User / AI", or "Translation provided by User / AI / APP"
