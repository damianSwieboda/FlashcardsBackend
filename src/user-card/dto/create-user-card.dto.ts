import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { RequireWhenIndicatedPropertIsEmpty } from 'src/decorators/RequireWhenIndicatedPropertIsEmpty';

@InputType()
export class CreateUserCardDTO {
  @IsNotEmpty()
  @IsString()
  @Field()
  readonly deckId: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly sourceLanguage: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  readonly targetLanguage: string;

  @RequireWhenIndicatedPropertIsEmpty('translatedExpression')
  @IsOptional()
  @IsString()
  @Field()
  readonly expression?: string;

  @IsOptional()
  @IsString()
  @Field()
  readonly usageExample?: string;

  @RequireWhenIndicatedPropertIsEmpty('expression')
  @IsOptional()
  @IsString()
  @Field()
  readonly translatedExpression?: string;

  @IsOptional()
  @IsString()
  @Field()
  readonly translatedUsageExample?: string;
}
