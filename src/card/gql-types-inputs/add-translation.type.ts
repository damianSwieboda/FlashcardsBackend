import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class AddTranslationType {
  @Field(() => ID)
  cardId: string;

  @Field()
  message: string;
}
