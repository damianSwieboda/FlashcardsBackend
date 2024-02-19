import { ID, Field, InputType } from '@nestjs/graphql';
import { TranslationInput } from './translation.input';

@InputType()
export class CardInput {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  deckId: string;

  @Field()
  isOfficial: boolean;

  @Field(() => [String])
  cardsIds: string[];

  @Field(() => [String])
  languages: string[];

  @Field(() => [TranslationInput])
  translations?: TranslationInput[];
}
