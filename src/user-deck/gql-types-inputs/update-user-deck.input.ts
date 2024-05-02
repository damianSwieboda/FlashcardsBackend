import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserDeckInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description?: string;

  @Field()
  cardId?: string;
}
