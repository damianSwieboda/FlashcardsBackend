import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class TranslationType {
  @Field(() => ID)
  cardId: string;

  @Field()
  language: string;

  @Field()
  word: string;

  @Field({ nullable: true })
  usageExample?: string;
}
