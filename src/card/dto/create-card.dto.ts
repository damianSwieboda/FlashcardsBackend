import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { TranslationDTO } from './translation.dto';

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
  @Field(() => [TranslationDTO]) // Specify the type explicitly here
  translations: TranslationDTO[];
}
