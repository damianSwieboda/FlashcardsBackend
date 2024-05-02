import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateOfficialDeckInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: false })
  description?: string;
}
