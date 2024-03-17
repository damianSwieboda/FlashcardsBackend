import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenerateUsageExampleType {
  @Field()
  usageExample: string;
}
