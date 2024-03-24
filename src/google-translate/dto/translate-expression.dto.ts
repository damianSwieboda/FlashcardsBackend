import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTranslate } from 'src/enums/suported-languages';
import { HasDifferentValue } from 'src/decorators/HasDiffrentValue';
// TODO add enums for languages shortcuts that match Google Cloud Translation API shortcuts, and check values of source and target language
@InputType()
export class TranslateExpressionDTO {
  @IsNotEmpty({ message: 'Please provide word or expression to translate' })
  @IsString()
  @Field()
  expressionToTranslate: string;

  @IsNotEmpty({ message: 'Please provide source language' })
  @IsString()
  @IsIn(Object.values(LanguagesSupportedByGoogleTranslate), {
    message: 'Translating service is not supporting provided source language',
  })
  @Field()
  sourceLanguage: string;

  @IsNotEmpty({ message: 'Please provide  target language' })
  @IsString()
  @IsIn(Object.values(LanguagesSupportedByGoogleTranslate), {
    message: 'Translating service is not supporting provided target language',
  })
  @HasDifferentValue('sourceLanguage')
  @Field()
  targetLanguage: string;
}
