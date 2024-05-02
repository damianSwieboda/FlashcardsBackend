import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOfficialDeckDTO {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  readonly name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly description?: string;
}
