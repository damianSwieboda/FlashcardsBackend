import { IsString, IsOptional, IsEnum } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTextTranslate } from 'src/enums/suported-languages';

@InputType()
export class UpdateTranslationDTO {
  @IsEnum(LanguagesSupportedByGoogleTextTranslate) // TODO: change to "supportedLanguages" once the final list is complete
  @IsString()
  @Field()
  language: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  word?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  usageExample?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  translatedWord?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  translatedUsageExample?: string;
}
