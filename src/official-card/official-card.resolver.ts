import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { OfficialCardService } from './official-card.service';
import { UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { OfficialCard } from './official-card.model';
import { AddTranslationDTO, CreateOfficialCardDTO, UpdateTranslationDTO } from './dto';
import {
  AddTranslationType,
  OfficialCardType,
  UpdateTranslationType,
  GenerateExpressionTranslationType,
} from './gql-types-inputs';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

@UseInterceptors(CurrentUser)
@Resolver(() => OfficialCardType)
export class OfficialCardResolver {
  constructor(private officialCardService: OfficialCardService) {}

  @Query(() => [OfficialCardType])
  async getOfficialCards(
    @Args('officialCardIds', { type: () => [String] }) officialCardIds: string[],
    @Args('languages', { type: () => [String] }) languages: string[]
  ): Promise<OfficialCard[]> {
    const officialCards = await this.officialCardService.getOfficialCards(
      officialCardIds,
      languages
    );
    return officialCards;
  }

  @Mutation(() => OfficialCardType)
  async createOfficialCard(
    @Args('createOfficialCardInput') createOfficialCardDTO: CreateOfficialCardDTO
  ): Promise<OfficialCard> {
    const officialCard = await this.officialCardService.createOfficialCard(createOfficialCardDTO);
    return officialCard;
  }

  @Mutation(() => AddTranslationType)
  async addTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('addTranslationInput') addTranslationDTO: AddTranslationDTO
  ): Promise<AddTranslationType> {
    const addedTranslationMessage = await this.officialCardService.addTranslation(
      officialCardId,
      addTranslationDTO
    );
    return { officialCardId, message: addedTranslationMessage };
  }

  @Mutation(() => UpdateTranslationType)
  async updateTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('updateTranslationInput') updatetranslationDTO: UpdateTranslationDTO
  ): Promise<UpdateTranslationType> {
    const updatedTranslationMessage = await this.officialCardService.updateTranslation(
      officialCardId,
      updatetranslationDTO
    );
    return { officialCardId, message: updatedTranslationMessage };
  }

  @Mutation(() => GenerateExpressionTranslationType)
  async generateExpressionTranslation(
    @Args('officialCardId') officialCardId: string,
    @Args('targetLanguage') targetLanguage: LanguagesSupportedByGoogleTranslate
  ): Promise<GenerateExpressionTranslationType> {
    const translatedExpression = await this.officialCardService.generateExpressionTranslation(
      officialCardId,
      targetLanguage
    );

    return { officialCardId, translatedExpression, targetLanguage };
  }
}
