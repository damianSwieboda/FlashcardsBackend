import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GenerateUsageExampleDTO {
  @IsNotEmpty({ message: 'Please provide expression' })
  @IsString()
  @Field()
  expression: string;

  @IsNotEmpty({ message: 'Please provide source language' })
  @IsString()
  @Field()
  sourceLanguage: string;
}
