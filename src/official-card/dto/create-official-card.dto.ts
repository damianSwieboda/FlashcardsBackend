import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { TranslationDTO } from './index';

@InputType()
export class CreateOfficialCardDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly deckId: string;

  @IsNotEmpty()
  @Field(() => TranslationDTO)
  translations: TranslationDTO;
}
