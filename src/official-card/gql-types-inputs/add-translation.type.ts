import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class AddTranslationType {
  @Field(() => ID)
  officialCardId: string;

  @Field()
  message: string;
}
