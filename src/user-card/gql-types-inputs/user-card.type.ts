import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserCardType {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  deckId: string;

  @Field()
  sourceLanguage: string;

  @Field()
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
