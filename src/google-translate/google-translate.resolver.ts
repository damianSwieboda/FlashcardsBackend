import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { TranslateExpressionDTO } from './dto';
import { TranslateExpressionType } from './gql-types-inputs';
import { GoogleTranslateService } from './google-translate.service';
import { CardService } from 'src/card/card.service';
import { Inject } from '@nestjs/common';
import { TranslationDTO } from 'src/card/dto';

@Resolver()
export class GoogleTranslateResolver {
  constructor(
    private googleTranslateService: GoogleTranslateService,
    @Inject(CardService) private readonly cardService: CardService
  ) {}

  @Mutation(() => TranslateExpressionType)
  async translateExpression(
    @Args('cardId', { type: () => String }) cardId: string,
    @Args('translateExpressionInput')
    translateExpressionInput: TranslateExpressionDTO
  ): Promise<any> {
    const translatedExpression =
      await this.googleTranslateService.translateExpression(translateExpressionInput);

    const translationInput = {
      language: translateExpressionInput.targetLanguage,
      word: translatedExpression,
    };

    const translation = await this.cardService.addTranslation(cardId, translationInput);

    return { translation };
  }
}
