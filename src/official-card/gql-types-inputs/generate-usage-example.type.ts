import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class GenerateUsageExampleType {
  @Field(() => ID, { nullable: false })
  officialCardId: string;

  @Field({ nullable: false })
  usageExample: string;
}
