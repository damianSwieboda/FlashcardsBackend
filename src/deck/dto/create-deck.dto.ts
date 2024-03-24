import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  // ValidateIf
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

@InputType()
export class CreateDeckDTO {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly description?: string;

  @IsString()
  @IsIn(Object.values(LanguagesSupportedByGoogleTranslate), {
    // TODO: change to "supportedLanguages" once the final list is complete
    message: 'Invalid first language',
  })
  @Field(() => String)
  readonly firstLanguage: string;

  @IsString()
  @IsIn(Object.values(LanguagesSupportedByGoogleTranslate), {
    // TODO: change to "supportedLanguages" once the final list is complete
    message: 'Invalid second language',
  })
  @Field(() => String)
  readonly secondLanguage: string;
}
