import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateDeckInputDTO {
  @IsOptional()
  @IsString()
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
