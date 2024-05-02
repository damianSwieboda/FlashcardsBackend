import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';

import { UserDeckType } from './gql-types-inputs';
import { UserDeckService } from './user-deck.service';
import { CreateUserDeckDTO, UpdateUserDeckDTO } from './dto';
// import { CurrentUser } from '../interceptors/current-user.interceptor';

@Resolver(() => UserDeckType)
export class UserDeckResolver {
  constructor(private deckService: UserDeckService) {}

  @Query(() => UserDeckType)
  findDeck() {
    return {
      id: 'abc123',
      name: 'English in IT',
      description: 'some description',
    };
  }

  @Mutation(() => UserDeckType)
  createDeck(
    @Context() context,
    @Args('createUserDeckInput') createUserDeckInput: CreateUserDeckDTO
  ) {
    const deckOwner = context.currentUser;
    return this.deckService.createDeck(deckOwner, createUserDeckInput);
  }

  @Mutation(() => UserDeckType)
  updateDeck(
    @Context() context,
    @Args('deckId') deckId: string,
    @Args('updateUserDeckInput') updateUserDeckInput: UpdateUserDeckDTO
  ) {
    const deckOwner = context.currentUser;
    return this.deckService.updateDeck(deckOwner, deckId, updateUserDeckInput);
  }
}
