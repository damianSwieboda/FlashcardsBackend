import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateOfficialDeckDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  readonly description?: string;
}
