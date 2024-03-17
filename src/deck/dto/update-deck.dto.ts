import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateDeckInputDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  readonly cardId?: string;
}
