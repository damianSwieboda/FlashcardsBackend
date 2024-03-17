import { Injectable } from '@nestjs/common';
import { GenerateUsageExampleDTO, GenerateUsageExampleTranslationDTO } from './dto';
import {
  GENERATE_INSTRUCTION,
  USAGE_EXAMPLE,
  USAGE_EXAMPLE_TRANSLATION,
} from './generationInstructions/textGenerationInstruction';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: any;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateUsageExample(generateUsageExampleInput: GenerateUsageExampleDTO) {
    const generatedInstruction = GENERATE_INSTRUCTION(USAGE_EXAMPLE, generateUsageExampleInput);

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: generatedInstruction }],
      model: 'gpt-3.5-turbo',
    });
    const usageExample = completion.choices[0].message.content;

    return usageExample;
  }

  async generateUsageExampleTranslation(
    generateUsageExampleTranslationInput: GenerateUsageExampleTranslationDTO
  ) {
    const generatedInstruction = GENERATE_INSTRUCTION(
      USAGE_EXAMPLE_TRANSLATION,
      generateUsageExampleTranslationInput
    );

    const completion = await this.openai.chat.completions.create({
      messages: [{ role: 'system', content: generatedInstruction }],
      model: 'gpt-3.5-turbo',
    });
    const translatedUsageExample = completion.choices[0].message.content;

    return translatedUsageExample;
  }
}
