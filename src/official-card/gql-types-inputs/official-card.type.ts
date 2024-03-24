import { Field, ObjectType, ID } from '@nestjs/graphql';
import { TranslationType } from './translation.type';

@ObjectType()
export class OfficialCardType {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  deckId: string;

  @Field(() => [TranslationType])
  translations?: TranslationType[];
}
