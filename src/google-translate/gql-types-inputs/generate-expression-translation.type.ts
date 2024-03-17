import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TranslateExpressionType {
  @Field()
  translatedExpression: string;
}
