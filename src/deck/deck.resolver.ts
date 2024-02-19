import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { DeckType } from './gql-types/deck.type';
import { DeckService } from './deck.service';
import { CreateDeckInputDTO, UpdateDeckInputDTO } from './dto';
import { UseInterceptors } from '@nestjs/common';
import { CurrentUser } from '../interceptors/current-user.interceptor';

@UseInterceptors(CurrentUser)
@Resolver(() => DeckType)
export class DeckResolver {
  constructor(private deckService: DeckService) {}

  @Query(() => DeckType)
  deck() {
    return {
      id: 'asedsz123',
      name: 'English in IT',
      description: 'some description',
    };
  }

  @Mutation(() => DeckType)
  createDeck(@Context() context, @Args('createDeckInput') createDeckInput: CreateDeckInputDTO) {
    const deckOwner = context.currentUser;
    return this.deckService.createDeck(deckOwner, createDeckInput);
  }

  @Mutation(() => DeckType)
  updateDeck(
    @Context() context,
    @Args('deckId') deckId: string,
    @Args('updateDeckInput') updateDeckInput: UpdateDeckInputDTO
  ) {
    const deckOwner = context.currentUser;
    return this.deckService.updateDeck(deckOwner, deckId, updateDeckInput);
  }
}
