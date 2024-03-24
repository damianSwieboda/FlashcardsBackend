import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { SupportedLanguages } from 'src/enums/suported-languages';

@InputType()
export class TranslationInput {
  @IsEnum(SupportedLanguages)
  @Field()
  language: string;

  @Field()
  expression: string;

  @Field()
  usageExample?: string;
}
