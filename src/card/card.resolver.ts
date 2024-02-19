import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CardService } from './card.service';
import { UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { CardType } from './gql-types/card.type';
import { Card } from './card.model';
import { CreateCardDTO, TranslationDTO } from './dto';
import { TranslationType } from './gql-types/translation.type';

@UseInterceptors(CurrentUser)
@Resolver(() => CardType)
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => [CardType])
  async getCards(
    @Args('cardsIds', { type: () => [String] }) cardsIds: string[],
    @Args('languages', { type: () => [String] }) languages: string[]
  ): Promise<Card[]> {
    const cards = await this.cardService.getCards(cardsIds, languages);
    return cards;
  }

  @Mutation(() => CardType)
  async createCard(@Args('createCardInput') createCardDTO: CreateCardDTO): Promise<Card> {
    const card = await this.cardService.createCard(createCardDTO);
    return card;
  }

  @Mutation(() => TranslationType)
  async addTranslation(
    @Args('cardId', { type: () => String }) cardId: string,
    @Args('translationInput') translationDTO: TranslationDTO
  ) {
    const translation = await this.cardService.addTranslation(cardId, translationDTO);
    return { cardId, ...translation };
  }

  @Mutation(() => TranslationType)
  async updateTranslation(
    @Args('cardId', { type: () => String }) cardId: string,
    @Args('translationInput') translationDTO: TranslationDTO
  ) {
    const { updatedTranslation, message } = await this.cardService.updateTranslation(
      cardId,
      translationDTO
    );
    return { cardId, updatedTranslation, message };
  }
}
