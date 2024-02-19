import { Field, ObjectType, ID } from '@nestjs/graphql';
import { TranslationType } from './translation.type';

@ObjectType()
export class CardType {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  deckId: string;

  @Field(() => Boolean)
  isOfficial: boolean;

  @Field(() => [TranslationType])
  translations?: TranslationType[];
}
