import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GenerateUsageExampleTranslationInput {
  @Field()
  expressionToTranslate: string;

  @Field()
  sourceLanguage: string;

  @Field()
  targetLanguage: string;
}
