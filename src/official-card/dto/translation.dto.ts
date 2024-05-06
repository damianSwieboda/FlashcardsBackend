import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

@InputType()
export class TranslationDTO {
  @IsEnum(LanguagesSupportedByGoogleTranslate) // TODO: change to "supportedLanguages" once the final list is complete
  @IsString()
  @Field()
  language: string;

  @IsNotEmpty({ message: 'At least one word or expression is required to create a flashcard' })
  @IsString()
  @Field()
  expression: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  usageExample?: string;
}
