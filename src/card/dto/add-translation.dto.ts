import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTextTranslate } from 'src/enums/suported-languages';

@InputType()
export class AddTranslationDTO {
  @IsIn(Object.values(LanguagesSupportedByGoogleTextTranslate), {
    message: 'Invalid first language',
  }) // TODO: change to "supportedLanguages" once the final list is complete
  @Field()
  language: string;

  @IsNotEmpty({ message: 'At least one word is required to create a flashcard' })
  @IsString()
  @Field()
  word: string;
}
