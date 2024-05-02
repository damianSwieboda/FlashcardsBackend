import { ObjectType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class UpdateOfficialDeckInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  description?: string;
}
