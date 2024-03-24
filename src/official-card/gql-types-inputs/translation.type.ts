import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TranslationType {
  @Field({ nullable: false })
  language: string;

  @Field({ nullable: false })
  expression: string;

  @Field()
  usageExample?: string;
}
