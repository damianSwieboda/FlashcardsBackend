import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TranslationType {
  @Field()
  language: string;

  @Field()
  word: string;

  @Field({ nullable: true })
  usageExample?: string;

  @Field({ nullable: true })
  translatedWord?: string;

  @Field({ nullable: true })
  translatedUsageExample?: string;
}
