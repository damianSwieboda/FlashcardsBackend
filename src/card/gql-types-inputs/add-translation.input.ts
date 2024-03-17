import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddTranslationInput {
  @Field()
  language: string;

  @Field()
  expression: string;
}
