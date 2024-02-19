import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeckType {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  deckOwner: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [ID])
  cards: string[];
}
