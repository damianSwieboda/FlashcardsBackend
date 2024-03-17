import { ID, Field, InputType } from '@nestjs/graphql';
import { TranslationType } from './translation.type';

@InputType()
export class CreateCardInput {
  @Field(() => ID)
  deckId: string;

  @Field()
  isOfficial: boolean;

  @Field(() => [TranslationType])
  translations?: TranslationType[];
}
