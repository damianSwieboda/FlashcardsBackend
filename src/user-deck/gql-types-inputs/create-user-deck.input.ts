import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDeckInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description?: string;
}
