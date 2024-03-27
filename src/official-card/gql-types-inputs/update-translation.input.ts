import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { SupportedLanguages } from 'src/enums/suported-languages';

@InputType()
export class UpdateTranslationInput {
  @IsEnum(SupportedLanguages)
  @Field()
  language: string;

  @Field({ nullable: true })
  expression: string;

  @Field({ nullable: true })
  usageExample?: string;
}
