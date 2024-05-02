import { ID, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class OfficialDeckType {
  @Field(() => ID)
  id: string;

  @Field(() => ID, { nullable: true })
  deckOwner: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  //todo, what if there is no cards?
  @Field(() => [ID])
  cards: string[];
}
