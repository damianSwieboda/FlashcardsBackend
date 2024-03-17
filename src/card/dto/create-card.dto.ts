import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { AddTranslationDTO } from './index';

@InputType()
export class CreateCardDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly deckId: string;

  @IsOptional()
  @IsBoolean()
  @Field()
  readonly isOfficial: boolean = true;

  @IsNotEmpty()
  @Field(() => [AddTranslationDTO])
  translations: AddTranslationDTO[];
}
