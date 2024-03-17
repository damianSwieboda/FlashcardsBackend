import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GenerateUsageExampleTranslationType {
  @Field()
  translatedUsageExample: string;
}
