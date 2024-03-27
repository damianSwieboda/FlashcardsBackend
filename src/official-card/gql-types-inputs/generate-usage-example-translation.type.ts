import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class GenerateUsageExampleTranslationType {
  @Field(() => ID, { nullable: false })
  officialCardId: string;

  @Field({ nullable: false })
  usageExampleTranslation: string;
}
