import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UpdateTranslationType {
  @Field(() => ID, { nullable: false })
  officialCardId: string;

  @Field()
  message: string;
}
