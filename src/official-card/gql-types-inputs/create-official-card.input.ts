import { ID, Field, InputType } from '@nestjs/graphql';
import { TranslationType } from './translation.type';

@InputType()
export class CreateCardInput {
  @Field(() => ID, { nullable: false })
  deckId: string;

  @Field(() => [TranslationType], { nullable: false })
  translations?: TranslationType[];
}
