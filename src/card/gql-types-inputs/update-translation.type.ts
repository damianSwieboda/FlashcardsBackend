import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UpdateTranslationType {
  @Field(() => ID)
  cardId: string;

  @Field()
  message: string;
}
