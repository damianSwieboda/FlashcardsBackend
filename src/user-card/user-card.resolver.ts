import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UserCardService } from './user-card.service';
import { UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/interceptors/current-user.interceptor';
import { UserCard } from './user-card.model';
import { CreateUserCardDTO } from './dto';
import { UserCardType } from './gql-types-inputs';

@UseInterceptors(CurrentUser)
@Resolver(() => UserCardType)
export class UserCardResolver {
  constructor(private userCardService: UserCardService) {}

  @Query(() => [UserCardType])
  async getUserCards(
    @Args('userCardIds', { type: () => [String] }) userCardIds: string[]
  ): Promise<UserCard[]> {
    const userCards = await this.userCardService.getUserCards(userCardIds);
    return userCards;
  }

  @Mutation(() => UserCardType)
  async createUserCard(
    @Args('createUserCardInput') createUserCardDTO: CreateUserCardDTO
  ): Promise<UserCard> {
    const userCard = await this.userCardService.createUserCard(createUserCardDTO);
    return userCard;
  }
}
