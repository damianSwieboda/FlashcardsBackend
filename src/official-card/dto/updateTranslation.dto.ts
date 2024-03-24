import { IsString, IsOptional, IsEnum, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

@InputType()
export class UpdateTranslationDTO {
  @IsEnum(LanguagesSupportedByGoogleTranslate) // TODO: change to "supportedLanguages" once the final list is complete
  @IsString()
  @Field()
  language: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Expression once defined it cannot be changed to be empty.' })
  @IsString()
  @Field()
  expression?: string;

  @IsOptional()
  @IsString()
  @Field()
  usageExample?: string;
}
