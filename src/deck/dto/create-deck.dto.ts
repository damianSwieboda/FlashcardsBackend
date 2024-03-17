import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  // ValidateIf
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { LanguagesSupportedByGoogleTextTranslate } from 'src/enums/suported-languages';

@InputType()
export class CreateDeckDTO {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly description?: string;

  @IsString()
  @IsIn(Object.values(LanguagesSupportedByGoogleTextTranslate), {
    // TODO: change to "supportedLanguages" once the final list is complete
    message: 'Invalid first language',
  })
  @Field(() => String)
  readonly firstLanguage: string;

  @IsString()
  @IsIn(Object.values(LanguagesSupportedByGoogleTextTranslate), {
    // TODO: change to "supportedLanguages" once the final list is complete
    message: 'Invalid second language',
  })
  @Field(() => String)
  readonly secondLanguage: string;

  // @IsOptional()
  // @Field()
  // readonly image: Buffer;

  // @ValidateIf((object: CreateDeckDTO) => object.image !== undefined) // TODO check if "object: createCardDTO" is this correct?
  // @IsNotEmpty({
  //   message:
  //     'Something went wrong. MIME type of image must be provided. Please contact with Support, we will fix it as soon as possbile.',
  // })
  // @IsNotEmpty()
  // @IsString()
  // @Field()
  // readonly imageMimeType: string;
}
