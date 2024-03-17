import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { CardService } from './card.service';
import { UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { Card } from './card.model';
import { AddTranslationDTO, CreateCardDTO, UpdateTranslationDTO } from './dto';
import { AddTranslationType, CardType, UpdateTranslationType } from './gql-types-inputs';

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

  @Mutation(() => AddTranslationType)
  async addTranslation(
    @Args('cardId', { type: () => String }) cardId: string,
    @Args('addTranslationInput') addTranslationDTO: AddTranslationDTO
  ): Promise<AddTranslationType> {
    const addedTranslationMessage = await this.cardService.addTranslation(
      cardId,
      addTranslationDTO
    );
    return { cardId, message: addedTranslationMessage };
  }

  @Mutation(() => UpdateTranslationType)
  async updateTranslation(
    @Args('cardId', { type: () => String }) cardId: string,
    @Args('updateTranslationInput') updatetranslationDTO: UpdateTranslationDTO
  ): Promise<UpdateTranslationType> {
    const updatedTranslationMessage = await this.cardService.updateTranslation(
      cardId,
      updatetranslationDTO
    );
    return { cardId, message: updatedTranslationMessage };
  }
}
