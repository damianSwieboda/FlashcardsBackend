import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddTranslationInput {
  @Field({ nullable: false })
  language: string;

  @Field({ nullable: false })
  expression: string;
}
