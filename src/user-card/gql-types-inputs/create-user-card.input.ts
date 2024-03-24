import { ID, Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCardInput {
  @Field(() => ID, { nullable: false })
  deckId: string;

  @Field({ nullable: false })
  sourceLanguage: string;

  @Field({ nullable: false })
  targetLanguage: string;

  @Field()
  expression?: string;

  @Field()
  usageExample?: string;

  @Field()
  translatedExpression?: string;

  @Field()
  translatedUsageExample?: string;
}
