import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  // ValidateIf
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { SupportedLanguages } from 'src/enums/suported-languages';

@InputType()
export class CreateDeckInputDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly name: string;

  @IsString()
  @IsOptional()
  @Field()
  readonly description: string;

  @IsString()
  @IsIn(Object.values(SupportedLanguages), { message: 'Invalid first language' })
  @Field(() => String)
  readonly firstLanguage: SupportedLanguages;

  @IsString()
  @IsIn(Object.values(SupportedLanguages), { message: 'Invalid second language' })
  @Field(() => String)
  readonly secondLanguage: SupportedLanguages;

  // @IsOptional()
  // @Field()
  // readonly image: Buffer;

  // @ValidateIf((object: CreateDeckInputDTO) => object.image !== undefined) // TODO check if "object: createCardDTO" is this correct?
  // @IsNotEmpty({
  //   message:
  //     'Something went wrong. MIME type of image must be provided. Please contact with Support, we will fix it as soon as possbile.',
  // })
  // @IsNotEmpty()
  // @IsString()
  // @Field()
  // readonly imageMimeType: string;
}
