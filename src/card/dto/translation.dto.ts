import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { SupportedLanguages } from 'src/enums/suported-languages';

@InputType()
export class TranslationDTO {
  @IsEnum(SupportedLanguages)
  @Field()
  language: string;

  @IsNotEmpty({ message: 'At least one word is required to create a flashcard' })
  @IsString()
  @Field()
  word: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field()
  usageExample: string;
}
