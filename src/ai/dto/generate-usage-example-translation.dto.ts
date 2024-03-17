import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateUsageExampleTranslationDTO {
  @IsNotEmpty({ message: 'Please provide usage example of expression to translate' })
  @IsString()
  @Field()
  usageExampleToTranslate: string;

  @IsNotEmpty({ message: 'Please provide source language' })
  @IsString()
  @Field()
  sourceLanguage: string;

  @IsNotEmpty({ message: 'Please provide  target language' })
  @IsString()
  @Field()
  targetLanguage: string;
}
