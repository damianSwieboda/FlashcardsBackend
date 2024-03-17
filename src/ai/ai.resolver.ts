import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { GenerateUsageExampleDTO, GenerateUsageExampleTranslationDTO } from './dto';
import { GenerateUsageExampleType, GenerateUsageExampleTranslationType } from './gql-types-inputs';
import { CardService } from 'src/card/card.service';
import { Inject } from '@nestjs/common';

// TODO, change "word" to "expression" in entire app, becouse it fits better
@Resolver()
export class AiResolver {
  constructor(
    private aiService: AiService,
    @Inject(CardService) private readonly cardService: CardService
  ) {}

  @Mutation(() => GenerateUsageExampleType)
  async generateUsageExample(
    @Args('generateUsageExampleInput') generateUsageExampleInput: GenerateUsageExampleDTO
  ): Promise<any> {
    const usageExample = await this.aiService.generateUsageExample(generateUsageExampleInput);
    return { usageExample };
  }

  @Mutation(() => GenerateUsageExampleTranslationType)
  async generateUsageExampleTranslation(
    @Args('generateUsageExampleTranslationInput')
    generateUsageExampleTranslationInput: GenerateUsageExampleTranslationDTO
  ): Promise<any> {
    const translatedUsageExample = await this.aiService.generateUsageExampleTranslation(
      generateUsageExampleTranslationInput
    );
    return { translatedUsageExample };
  }
}
