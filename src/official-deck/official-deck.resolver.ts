import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

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
    return await this.officialDeckService.findDeck(deckId);
  }

  // @UseGuards(ClerkAuthGuard)
  @Mutation(() => OfficialDeckType)
  createDeck(@Args('createDeckInput') createDeckInput: CreateOfficialDeckDTO) {
    return this.officialDeckService.createDeck(createDeckInput);
  }

  @Mutation(() => OfficialDeckType)
  updateDeck(
    @Args('deckId') deckId: string,
    @Args('updateDeckInput') updateDeckInput: UpdateOfficialDeckDTO
  ) {
    return this.officialDeckService.updateDeck(deckId, updateDeckInput);
  }
}
