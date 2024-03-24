import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';

@InputType()
export class AddTranslationDTO {
  @IsIn(Object.values(LanguagesSupportedByGoogleTranslate), {
    message: 'Invalid first language',
  }) // TODO: change to "supportedLanguages" once the final list is complete
  @Field()
  language: string;

  @IsNotEmpty({ message: 'Provide at least one word or expression to create translation' })
  @IsString()
  @Field()
  expression: string;
}
