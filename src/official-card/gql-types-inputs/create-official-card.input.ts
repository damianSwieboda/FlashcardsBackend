import { ID, Field, InputType } from '@nestjs/graphql';
import { TranslationInput } from './translation.input';

@InputType()
export class CreateCardInput {
  @Field(() => ID, { nullable: false })
  deckId: string;

  @Field(() => [TranslationInput], { nullable: false })
  translations?: TranslationInput[];
}
