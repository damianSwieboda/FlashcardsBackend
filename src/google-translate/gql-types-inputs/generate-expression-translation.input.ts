import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TranslateExpressionInput {
  @Field()
  expressionToTranslate: string;

  @Field()
  sourceLanguage: string;

  @Field()
  targetLanguage: string;
}
