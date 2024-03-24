import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class GenerateExpressionTranslationType {
  @Field(() => ID, { nullable: false })
  officialCardId: string;

  @Field({ nullable: false })
  translatedExpression: string;

  @Field({ nullable: false })
  targetLanguage: string;
}
