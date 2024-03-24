import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { AddTranslationDTO } from './index';

@InputType()
export class CreateOfficialCardDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly deckId: string;

  @IsNotEmpty()
  @Field(() => [AddTranslationDTO])
  translations: AddTranslationDTO[];
}
