import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { SupportedLanguages } from 'src/enums/suported-languages';

@InputType()
export class TranslationInput {
  @IsEnum(SupportedLanguages)
  @Field()
  language: string;

  @Field()
  word: string;

  @Field({ nullable: true })
  usageExample?: string;
}
