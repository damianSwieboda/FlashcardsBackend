import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';

import { OfficialDeckType } from './gql-types-inputs';
import { OfficialDeckService } from './official-deck.service';
import { CreateOfficialDeckDTO, UpdateOfficialDeckDTO } from './dto';
// import { ClerkAuthGuard } from 'src/auth/clerk-auth.guard';

@Resolver(() => OfficialDeckType)
export class OfficialDeckResolver {
  constructor(private officialDeckService: OfficialDeckService) {}

  @Query(() => OfficialDeckType)
  async findDeck(@Args('deckId') deckId: string) {
    // Call your service to fetch the deck by ID
    return await this.officialDeckService.findDeckById(deckId);
  }

  // @UseGuards(ClerkAuthGuard)
  @Mutation(() => OfficialDeckType)
  createDeck(@Context() context, @Args('createDeckInput') createDeckInput: CreateOfficialDeckDTO) {
    const deckOwner = context.currentUser;
    return this.officialDeckService.createDeck(deckOwner, createDeckInput);
  }

  @Mutation(() => OfficialDeckType)
  updateDeck(
    @Context() context,
    @Args('deckId') deckId: string,
    @Args('updateDeckInput') updateDeckInput: UpdateOfficialDeckDTO
  ) {
    const deckOwner = context.currentUser;
    return this.officialDeckService.updateDeck(deckOwner, deckId, updateDeckInput);
  }
}
